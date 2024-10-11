'use client'

//COMPONENETS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//UTILS
const queryClient = new QueryClient();
import React from 'react';

type QueryProviderProps = {
  children: React.ReactElement
}

export function QueryProvider(props: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
