'use client';

//COMPONENTS
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

//UTILS
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const productSchema = yup.object({
  name: yup.string().required('campo obrigatório'),
  description: yup.string(),
  expirationDate: yup.string().required('campo obrigatório'),
  amount: yup.number().positive().integer().required('campo obrigatório'),
});

type FormData = yup.InferType<typeof productSchema>;

type Props = {};

export default function page(props: Props) {
  const form = useForm<FormData>({
    resolver: yupResolver(productSchema),
  });

  const updateProduct = (data: FormData) => console.log(data);

  const searchParams = useSearchParams();
  const productId: string | null = searchParams.get('id');

  return (
    <div>
      <main>
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
                      <Input {...field} />
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
                      <Textarea {...field} />
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
                        <Input type="date" {...field} />
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
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
