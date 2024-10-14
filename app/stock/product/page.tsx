'use client';

//COMPONENTS
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import * as Icons from '@/icons';
import { Skeleton } from '@/components/ui/skeleton';
import * as Componenets from '@/components/index';

//UTILS
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSearchParams, useRouter } from 'next/navigation';
import { deleteProduct, getProduct, updateProduct } from '@/app/actions';
import { KitchenStaplesProps } from '@/types/Data';
import { ApiResponse } from '@/network/api';
import { formatDate, trimObjValues } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const productSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required('campo obrigatório'),
  description: yup.string(),
  expirationDate: yup.string().required('campo obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor válido')
    .positive('Informe um valor maior do que 0')
    .integer('Informe um número válido')
    .required('campo obrigatório'),
});

type FormData = yup.InferType<typeof productSchema>;

export default function page() {
  const router = useRouter();
  const urlParams = useSearchParams();
  const productId = urlParams.get('id') || '';
  const [allowEdit, setAllowEdit] = React.useState<boolean>(false);
  const [allowSave, setAllowSave] = React.useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: yupResolver(productSchema),
  });

  async function getProductData(): Promise<ApiResponse<KitchenStaplesProps>> {
    const result = await getProduct({
      id: productId,
    });

    form.reset({
      ...result.data[0],
      expirationDate: formatDate(result.data[0]?.expirationDate, {
        originalFormat: 'dd/MM/yyyy',
        targetFormat: 'yyyy-MM-dd',
      }),
    });

    return result;
  }

  const {
    data: productDataResponse,
    isLoading: productDataIsLoading,
    error: productDataError,
  } = useQuery<ApiResponse<KitchenStaplesProps>>({
    queryKey: ['getProduct'],
    queryFn: getProductData,
  });

  React.useEffect(() => {
    if (form.formState.isDirty) {
      setAllowSave(true);
    } else {
      setAllowSave(false);
    }
  }, [form.formState]);

  React.useEffect(() => {
    if (productDataError) {
      toast.error('Falha no carregamento dos dados');
    }
  }, [productDataError]);

  const deleteProductMutation = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => await deleteProduct({ id: productId }, { revalidatePath: '/' }),
    onSuccess: () => {
      toast.success('Produto removido com sucesso');
      router.push('/');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ data, productId }: { data: KitchenStaplesProps; productId: string }) =>
      await updateProduct(data, { id: productId }, { revalidatePath: '/' }),
    onMutate: () => {
      setAllowEdit(false);
      setAllowSave(false);
    },
    onSuccess: () => {
      toast.success('Dados atualizados com sucesso');
    },
  });

  const submitForm = async (formData: FormData) => {
    const trimmedObj = trimObjValues(formData);
    const sanitizedData: FormData = {
      ...trimmedObj,
      expirationDate: formatDate(trimmedObj?.expirationDate, { originalFormat: 'yyyy-MM-dd', targetFormat: 'dd/MM/yyyy' }), // The date input only accepts dates in the US format, so it needs to be converted before being saved in the database
    };

    updateProductMutation.mutate({ data: sanitizedData, productId: productId });
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate({ productId: productId });
  };

  return (
    <div>
      <main className="space-y-12">
        <Icons.ArrowLeft className="absolute left-4 t-0 text-primary" onClick={() => router.push('/')} />
        <h2 className="text-primary w-full text-2xl font-semibold">Detalhes do item</h2>
        <div>
          {productDataIsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-[60%]" />
                <Skeleton className="h-12 flex-1" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-12 w-28" />
                <Skeleton className="h-12 w-28" />
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input readOnly={!allowEdit} disabled={!allowEdit} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea readOnly={!allowEdit} disabled={!allowEdit} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="expirationDate"
                    render={({ field }) => (
                      <FormItem className="w-[60%]">
                        <FormLabel>Data de validade</FormLabel>
                        <FormControl>
                          <Input readOnly={!allowEdit} disabled={!allowEdit} type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input readOnly={!allowEdit} disabled={!allowEdit} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex flex-wrap gap-2 items-center">
                  {(allowEdit || updateProductMutation.isPending) && (
                    <Button disabled={!allowSave || updateProductMutation.isPending} type="submit">
                      {updateProductMutation.isPending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {updateProductMutation.isPending ? 'Salvando' : 'Salvar'}
                    </Button>
                  )}
                  <Button
                    variant={'secondary'}
                    onClick={() => {
                      setAllowEdit(!allowEdit);
                      if (allowEdit) {
                        if (productDataResponse?.data[0]) {
                          form.reset({
                            ...productDataResponse.data[0],
                            expirationDate: formatDate(productDataResponse.data[0].expirationDate, {
                              originalFormat: 'dd/MM/yyyy',
                              targetFormat: 'yyyy-MM-dd',
                            }),
                          });
                        } else {
                          form.reset();
                        }
                      }
                    }}
                    type="button"
                    disabled={updateProductMutation.isPending || deleteProductMutation.isPending}
                  >
                    {allowEdit ? 'Cancelar edição' : 'Editar informações'}
                  </Button>
                  <Componenets.ConfirmationDialog
                    confirmText="Remover"
                    title="Confirmação"
                    description="Deseja remover esse produto?"
                    onConfirm={() => {
                      handleDeleteProduct(productId);
                    }}
                  >
                    <Button variant={'destructive'} disabled={updateProductMutation.isPending || deleteProductMutation.isPending}>
                      {deleteProductMutation.isPending ? (
                        <>
                          <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deletando
                        </>
                      ) : (
                        <Icons.Trash2 className="size-4" />
                      )}
                    </Button>
                  </Componenets.ConfirmationDialog>
                </div>
              </form>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
}
