'use client'

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Flex boxSizing="border-box" bg="gray.300">
      <Box height="100vh" p={2} pr="0">
        <Box
          bg="brand.900"
          borderRadius={10}
          borderTopRightRadius="0"
          borderBottomRightRadius="0"
          width="80px"
          h="100%"
        >
          <Flex
            bg="brand.800"
            borderTopLeftRadius={10}
            width="80px"
            height="80px"
            alignItems="center"
            justifyContent="center"
          >
            <img src="/ranktt-header-logo.svg" width="42px" />
          </Flex>
          Nav
        </Box>
      </Box>
      <Box h="100vh" p={2} pl="0" flex="1">
        <Box
          bg="white"
          borderRadius={10}
          borderTopLeftRadius="0"
          borderBottomLeftRadius="0"
          width="100%"
          h="100%"
        >
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
