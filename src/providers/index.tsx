'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '@/theme'

import AuthContextProvider from './AuthContextProvider'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </AuthContextProvider>
  )
}
