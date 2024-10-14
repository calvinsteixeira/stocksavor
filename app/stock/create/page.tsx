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
import { useRouter } from 'next/navigation';
import { formatDate, trimObjValues } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createProduct } from '@/app/actions';

const productSchema = yup.object({
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

  const form = useForm<FormData>({
    resolver: yupResolver(productSchema),
  });

  const createProductMutation = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => await handleCreateProduct(data),
    onMutate: () => {},
    onSuccess: () => {
      toast.success('Produto criado com sucesso');
      router.push('/')
    },
    onError: () => toast.error('Falha ao tentar criar o registro'),
  });

  const handleCreateProduct = async (data: FormData) => {
    await createProduct(data, { revalidatePath: '/' });
  };

  const submitForm = async (formData: FormData) => {
    const trimmedObj = trimObjValues(formData);
    const sanitizedData: FormData = {
      ...trimmedObj,
      expirationDate: formatDate(trimmedObj?.expirationDate, { originalFormat: 'yyyy-MM-dd', targetFormat: 'dd/MM/yyyy' }), // The date input only accepts dates in the US format, so it needs to be converted before being saved in the database
    };

    createProductMutation.mutate({ data: sanitizedData });
  };

  return (
    <div>
      <main className="space-y-12">
        <Icons.ArrowLeft className="absolute left-4 t-0 text-primary" onClick={() => router.push('/')} />
        <h2 className="text-primary w-full text-2xl font-semibold">Cadastrar novo item</h2>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input readOnly={createProductMutation.isPending} disabled={createProductMutation.isPending} {...field} />
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
                      <Textarea readOnly={createProductMutation.isPending} disabled={createProductMutation.isPending} {...field} />
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
                        <Input readOnly={createProductMutation.isPending} disabled={createProductMutation.isPending} type="date" {...field} />
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
                        <Input readOnly={createProductMutation.isPending} disabled={createProductMutation.isPending} type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex flex-wrap gap-2 items-center">
                <Button disabled={createProductMutation.isPending} type="submit">
                  {createProductMutation.isPending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {createProductMutation.isPending ? 'Criando' : 'Criar'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
