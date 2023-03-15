'use client'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

import { AuthContextProvider } from '@/providers/AuthContextProvider'
import theme from '@/theme/theme'

import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
