'use client'

import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Stack,
  Tooltip,
  useColorModeValue,
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
  BiLogOut
} from 'react-icons/bi'

import CreateOrganization from '@/components/CreateOrganization'

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

  return (
    <Tooltip hasArrow label={title} placement="auto">
      <Flex
        as={Link}
        href={route}
        bg={
          pathname === route
            ? 'linear-gradient(140deg, #F8D591 40%, #D6B370 60%)'
            : 'linear-gradient(140deg, #CECFD0 0%, #9C9FA8 60%)'
        }
        width="48px"
        height="48px"
        alignItems="center"
        justifyContent="center"
        borderRadius="20%"
      >
        <Icon as={icon} w="24px" h="24px" color="#151718" />
      </Flex>
    </Tooltip>
  )
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  let navbarPosition = 'fixed' as const
  let navbarFilter = 'none'
  let navbarBackdrop = 'blur(16px)'
  let navbarShadow = 'none'
  let navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.2)',
    'rgba(11,20,55,0.5)'
  )
  let navbarBorder = 'transparent'
  let secondaryMargin = '0px'
  let paddingX = '15px'

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      boxSizing="border-box"
      bg="#D7D8DF"
      height="100vh"
      p={3}
      overflow="hidden"
    >
      <CreateOrganization
        onCreated={() => {}}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Flex
        height="100%"
        background="white"
        p={3}
        borderRadius="2xl"
        boxShadow="md"
      >
        <Box>
          <Flex
            bg="#151718"
            borderRadius="2xl"
            width="80px"
            h="100%"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex
              bg="linear-gradient(140deg, #EBB44A 40%, #B58832 60%)"
              borderTopLeftRadius="2xl"
              borderTopRightRadius="2xl"
              width="80px"
              height="80px"
              alignItems="center"
              justifyContent="center"
            >
              <img src="/ranktt-navbar-logo.svg" width="42px" />
            </Flex>

            <Stack gap="10px">
              <NavbarIcon title="Painel" route="/painel" icon={BiHomeAlt} />
              <NavbarIcon
                title="Campeonatos"
                route="/campeonatos"
                icon={BiTrophy}
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
        </Box>
        <Box h="100%" pl={4} flex="1" overflowY="auto" borderRadius="xl">
          <Portal>
            <Box
              position={navbarPosition}
              boxShadow={navbarShadow}
              bg={navbarBg}
              borderColor={navbarBorder}
              filter={navbarFilter}
              backdropFilter={navbarBackdrop}
              backgroundPosition="center"
              backgroundSize="cover"
              borderRadius="16px"
              borderWidth="1.5px"
              borderStyle="solid"
              transitionDelay="0s, 0s, 0s, 0s"
              transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
              transition-property="box-shadow, background-color, filter, border"
              transitionTimingFunction="linear, linear, linear, linear"
              alignItems={{ xl: 'center' }}
              // display={secondary ? 'block' : 'flex'}
              minH="75px"
              justifyContent={{ xl: 'center' }}
              lineHeight="25.6px"
              mx="auto"
              mt={secondaryMargin}
              pb="8px"
              right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
              px={{
                sm: paddingX,
                md: '10px'
              }}
              ps={{
                xl: '12px'
              }}
              pt="8px"
              top={{ base: '12px', md: '16px', xl: '18px' }}
              w={{
                base: 'calc(100vw - 6%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 350px)',
                '2xl': 'calc(100vw - 365px)'
              }}
            >
              fdfsddff
            </Box>
          </Portal>
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
