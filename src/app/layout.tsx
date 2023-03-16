'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { Roboto_Flex, Syne } from 'next/font/google'
import React from 'react'

import { AuthContextProvider } from '@/providers/AuthContextProvider'
import theme from '@/theme/theme'

import './globals.css'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap'
})
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={roboto.className}>
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
