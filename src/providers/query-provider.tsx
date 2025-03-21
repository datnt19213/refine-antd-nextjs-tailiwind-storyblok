"use client";

import {
  ReactNode,
  Suspense,
  useState,
} from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

interface QueryProviderProps {
    children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return <Suspense><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></Suspense>;
}
