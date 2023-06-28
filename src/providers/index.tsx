'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import theme from '@/theme'

import AuthContextProvider from './AuthContextProvider'

const queryClient = new QueryClient()

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}
