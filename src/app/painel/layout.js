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
  BiCast,
  BiFullscreen,
  BiExitFullscreen
} from 'react-icons/bi'
import screenfull from 'screenfull'

import CreateOrganization from '@/components/CreateOrganization'
import useCurrentOrganization from '@/hooks/useCurrentOrganization'
import useCurrentUser from '@/hooks/useCurrentUser'
import useOrganization from '@/hooks/useOrganization'
import useSwitchOrganization from '@/hooks/useSwitchOrganization'
import { AuthContextProvider } from '@/providers/AuthContextProvider'

function OrganizationSwitchLink({ organizationId }) {
  const [organization, loading, error] = useOrganization(organizationId)
  const [switchOrganization] = useSwitchOrganization()

  // const isCurrent = currentOrganization?.id === organization?.id

  return (
    <MenuItem
      icon={<BiStoreAlt />}
      fontSize="sm"
      fontWeight="normal"
      onClick={() => {
        switchOrganization(organizationId)
      }}
    >
      {organization?.name}
    </MenuItem>
  )
}

const NavbarIcon = ({ route, title, icon }) => {
  const pathname = usePathname()
  const isRouteActive =
    route.split('/').length === 2
      ? pathname === route
      : pathname.split('/').includes(route.split('/').slice(-1)[0])

  return (
    <Tooltip hasArrow label={title} placement="auto">
      <Flex
        as={Link}
        href={route}
        bg={isRouteActive ? '#242529' : 'transparent'}
        width="48px"
        height="48px"
        alignItems="center"
        justifyContent="center"
        borderRadius="20%"
      >
        <Icon
          as={icon}
          w="24px"
          h="24px"
          color={isRouteActive ? '#FFF' : '#AAAAAA'}
        />
      </Flex>
    </Tooltip>
  )
}

export default function RootLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentUser, loadingCurrentUser, currentUserError] = useCurrentUser()
  const [
    currentOrganization,
    loadingCurrentOrganization,
    currentOrganizationError
  ] = useCurrentOrganization()
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  if (typeof window !== 'undefined') {
    screenfull.on('change', () => {
      setIsFullscreen(screenfull.isFullscreen)
    })
  }

  return (
    <AuthContextProvider>
      <Flex bg="#FAFAFB" boxShadow="md" height="100vh" overflow="hidden">
        <CreateOrganization isOpen={isOpen} onClose={onClose} />
        <Flex
          boxShadow="1px 0 0 0 rgba(0,0,0,0.05)"
          bg="#161819"
          width="80px"
          h="100%"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          zIndex={999}
        >
          <Flex
            bg="linear-gradient(140deg, #7F55DA 25%, #551FC9 75%)"
            borderRadius="lg"
            width="42px"
            height="42px"
            alignItems="center"
            justifyContent="center"
            mt="8px"
          >
            <img src="/ranktt-navbar-logo.svg" width="24px" />
          </Flex>

          <Stack gap="10px" margin="auto">
            <NavbarIcon title="Painel" route="/painel" icon={BiHomeAlt} />
            <NavbarIcon
              title="Torneios"
              route="/painel/torneios"
              icon={BiTrophy}
            />
            <NavbarIcon title="Telões" route="/painel/teloes" icon={BiCast} />
          </Stack>

          <Flex></Flex>
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
              <MenuItem
                icon={isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
                onClick={() => {
                  screenfull.toggle()
                }}
              >
                {isFullscreen ? 'Desativar tela cheia' : 'Modo tela cheia'}
              </MenuItem>
              <MenuGroup title="Organizações">
                {currentUser?.organizations.map((organizationId) => (
                  <OrganizationSwitchLink
                    key={organizationId}
                    organizationId={organizationId}
                  />
                ))}
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
        <Flex
          flexDirection="column"
          h="100vh"
          flex="1"
          overflowY="auto"
          overflowX="hidden"
          borderRadius="xl"
          position="relative"
        >
          {children}
        </Flex>
      </Flex>
    </AuthContextProvider>
  )
}
