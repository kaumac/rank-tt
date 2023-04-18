'use client'

import {
  Avatar,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  BiHomeAlt,
  BiTrophy,
  BiStoreAlt,
  BiCog,
  BiLogOut,
  BiSlideshow
} from 'react-icons/bi'

import CreateOrganization from '@/components/CreateOrganization'
import useCurrentOrganization from '@/hooks/useCurrentOrganization'

const NavbarIcon = ({
  route,
  title,
  icon
}: {
  route: string
  title: string
  icon: React.ElementType
}) => {
  const pathname = usePathname()
  console.log(pathname.split('/'))
  console.log('route', route)
  const isRouteActive =
    route.split('/').length === 2
      ? pathname === route
      : pathname.split('/').includes(route.split('/').slice(-1)[0])

  return (
    <Tooltip hasArrow label={title} placement="auto">
      <Flex
        as={Link}
        href={route}
        bg={isRouteActive ? '#FFF' : 'transparent'}
        width="48px"
        height="48px"
        alignItems="center"
        justifyContent="center"
        borderRadius="20%"
        boxShadow={isRouteActive ? 'inset 0px 0px 0px 1px #E9ECED' : 'none'}
      >
        <Icon
          as={icon}
          w="24px"
          h="24px"
          color={isRouteActive ? '#39404D' : '#686F7A'}
        />
      </Flex>
    </Tooltip>
  )
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentOrganization, loading, error] = useCurrentOrganization()

  return (
    <Flex bg="#FFFFFF" boxShadow="md" height="100vh" overflow="hidden">
      <CreateOrganization isOpen={isOpen} onClose={onClose} />
      <Flex
        bg="#F9FBFC"
        width="80px"
        h="100%"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        zIndex={999}
      >
        <Flex
          bg="linear-gradient(140deg, #60C9D8 25%, #14A2B7 75%)"
          borderRadius="lg"
          width="60px"
          height="60px"
          alignItems="center"
          justifyContent="center"
          mt="8px"
        >
          <img src="/ranktt-navbar-logo.svg" width="32px" />
        </Flex>

        <Stack gap="10px">
          <NavbarIcon title="Painel" route="/painel" icon={BiHomeAlt} />
          <NavbarIcon
            title="Torneios"
            route="/painel/torneios"
            icon={BiTrophy}
          />
          <NavbarIcon
            title="Telões"
            route="/painel/teloes"
            icon={BiSlideshow}
          />
        </Stack>

        <Menu isLazy>
          <MenuButton>
            <Flex
              width="80px"
              height="80px"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar name="Ateme" />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuGroup title="Organizações">
              <MenuItem icon={<BiStoreAlt />} onClick={onOpen}>
                Criar organização
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="Meu perfil">
              <MenuItem icon={<BiCog />} onClick={onOpen}>
                Configurações
              </MenuItem>
              <MenuItem icon={<BiLogOut />} onClick={onOpen}>
                Encerrar sessão
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
      <Box
        h="100%"
        flex="1"
        overflowY="auto"
        borderRadius="xl"
        position="relative"
        pt={20}
      >
        {children}
      </Box>
    </Flex>
  )
}
