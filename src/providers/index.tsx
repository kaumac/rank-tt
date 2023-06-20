'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '@/theme'

import AuthContextProvider from './AuthContextProvider'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
