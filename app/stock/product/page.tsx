'use client';

//COMPONENTS
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import * as Icons from '@/icons';

//UTILS
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSearchParams, useRouter } from 'next/navigation';
import { kitchenstaplesActions } from '@/app/actions/kitchenstaples';
import { KitchenStaplesProps } from '@/types/Data';
import { ApiResponse } from '@/network/api';
import { formatDate, trimObjValues } from '@/lib/utils';
import { useLoading } from '@/hooks/useLoading';

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

type Props = {};

export default function page(props: Props) {
  const { loading, withLoading } = useLoading()
  const router = useRouter();
  const urlParams = useSearchParams();
  const productId = urlParams.get('id') || '';
  const [productData, setProductData] = React.useState<KitchenStaplesProps | null>(null);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [allowSave, setAllowSave] = React.useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: yupResolver(productSchema),
  });

  React.useEffect(() => {
    async function getData() {
      const result: ApiResponse<KitchenStaplesProps> = await kitchenstaplesActions.get({
        id: productId,
      });
      const data = result.data[0];

      form.reset({
        ...data,
        expirationDate: formatDate(data?.expirationDate, { originalFormat: 'dd/MM/yyyy', targetFormat: 'yyyy-MM-dd' }),
      });

      setProductData({
        ...data,
        expirationDate: formatDate(data?.expirationDate, { originalFormat: 'dd/MM/yyyy', targetFormat: 'yyyy-MM-dd' }),
      });
    }

    getData();
  }, [productId]);

  React.useEffect(() => {
    if (form.formState.isDirty) {
      setAllowSave(true);
    } else {
      setAllowSave(false);
    }
  }, [form.formState]);

  const updateProduct = async (formData: FormData) => {
    const trimmedObj = trimObjValues(formData)
    const brDateFormat = formatDate(trimmedObj?.expirationDate, { originalFormat: 'yyyy-MM-dd', targetFormat: 'dd/MM/yyyy' });
    alert(JSON.stringify(trimmedObj))
    withLoading(async () => kitchenstaplesActions.put({ ...trimmedObj, expirationDate: brDateFormat }, { id: productId }))
  };

  return (
    <div>
      {productData && (
        <main className="space-y-12">
          <Icons.ArrowLeft className="absolute left-4 t-0 text-primary" onClick={() => router.push('/')} />
          <h2 className="text-primary w-full text-2xl font-semibold">Detalhes do item</h2>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateProduct)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input readOnly={!editMode} disabled={!editMode} {...field} />
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
                        <Textarea readOnly={!editMode} disabled={!editMode} {...field} />
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
                          <Input readOnly={!editMode} disabled={!editMode} type="date" {...field} />
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
                          <Input readOnly={!editMode} disabled={!editMode} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-x-2">
                  <Button
                    variant={'secondary'}
                    onClick={() => {
                      setEditMode(!editMode);
                      if (editMode) {
                        if (productData) {
                          form.reset(productData);
                        } else {
                          form.reset();
                        }
                      }
                    }}
                    type="button"
                    disabled={loading}
                  >
                    {editMode ? 'Cancelar edição' : 'Editar informações'}
                  </Button>
                  {editMode && (
                    <Button disabled={editMode && !allowSave || loading} type="submit">
                      {loading && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {loading ? 'Salvando os' : 'Salvar'} dados
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </main>
      )}
    </div>
  );
}
