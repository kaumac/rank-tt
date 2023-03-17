'use client'

import { Avatar, Box, Flex, Icon, Stack } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiHomeAlt, BiTrophy } from 'react-icons/bi'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <Flex boxSizing="border-box" bg="gray.300">
      <Box height="100vh" p={2} pr="0">
        <Flex
          bg="brand.900"
          borderRadius={10}
          borderTopRightRadius="0"
          borderBottomRightRadius="0"
          width="80px"
          h="100%"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
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

          <Stack gap="10px">
            <Flex
              bg={pathname === '/painel' ? '#FFCD50' : 'brand.800'}
              width="48px"
              height="48px"
              alignItems="center"
              justifyContent="center"
              borderRadius="20%"
            >
              <Icon
                as={BiHomeAlt}
                w="24px"
                h="24px"
                color={pathname === '/painel' ? 'brand.900' : 'brand.100'}
                opacity={pathname === '/painel' ? '1' : '0.9'}
              />
            </Flex>
            <Flex
              bg="brand.800"
              width="48px"
              height="48px"
              alignItems="center"
              justifyContent="center"
              borderRadius="20%"
            >
              <Icon
                as={BiTrophy}
                w="24px"
                h="24px"
                color="brand.100"
                opacity="0.9"
              />
            </Flex>
          </Stack>

          <Flex
            width="80px"
            height="80px"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar name="Ateme" />
          </Flex>
        </Flex>
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
