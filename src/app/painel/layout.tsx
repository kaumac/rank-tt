'use client'

import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  chakra,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import {
  BiChevronDown,
  BiCog,
  BiExitFullscreen,
  BiFullscreen,
  BiHomeAlt,
  BiLogOut,
  BiSearch,
  BiTrophy
} from 'react-icons/bi'
import screenfull from 'screenfull'

import { SwitchAccountModal } from '@/components'
import AccountModal from '@/components/AccountModal'
import { useSwitchOrganization } from '@/hooks'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useCurrentOrganization, useCurrentUserOrganizations } from '@/queries'
import { browserClient } from '@/supabase'
import { colors } from '@/theme'

const navItemHeight = 48
const navItemSpacing = 8

const navItemsList = [
  {
    title: 'Home',
    route: '/painel',
    icon: BiHomeAlt,
    color: colors.blue[500],
    bgColor: 'rgba(32, 110, 241, 0.1)'
  },
  {
    title: 'Torneios',
    route: '/painel/torneios',
    icon: BiTrophy,
    color: colors.magenta[500],
    bgColor: 'rgba(167, 75, 246, 0.1)'
  },
  {
    title: 'Busca',
    icon: BiSearch,
    color: colors.green[500],
    bgColor: '#5A446C'
  }
]

const ContentCardWrapper = chakra(Flex, {
  baseStyle: {
    flex: 1
  }
})

const ContentCard = chakra(Flex, {
  baseStyle: {
    bg: 'rgb(254, 254, 254)',
    borderRadius: 'xxl',
    borderBottom: '1px solid #FFF',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
    flex: 1
  }
})

const LayoutHeader = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    px: {
      lg: '0.6rem'
    },
    pt: {
      lg: '0.4rem'
    },
    pb: {
      lg: '0.6rem'
    }
  }
})

const SidebarNavWrapper = chakra(Box, {
  baseStyle: {
    position: 'relative',
    scrollbarWidth: 'none',
    scrollBehavior: 'smooth',
    overflow: 'visible'
  }
})

interface SidebarNavItemProps {
  route: string | undefined
  title: string
  color: string
  icon: IconType
  isActive: boolean
}

const SidebarNavItem = ({ route, title, color, icon, isActive }: SidebarNavItemProps) => {
  return (
    <Tooltip hasArrow label={title} placement="auto" zIndex={10} isDisabled>
      <Flex
        bg={
          isActive
            ? 'linear-gradient(140deg, rgba(255,255,255,0.03) 10%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 90%)'
            : 'undefined'
        }
        borderRadius="full"
        data-group
        whiteSpace="nowrap"
        as={route ? Link : undefined}
        cursor="pointer"
        href={route ? route : undefined}
        width="100%"
        alignItems="center"
        px={{ base: 3, xl: 4 }}
        height="32px"
        justifyContent="center"
        pointerEvents={isActive ? 'none' : undefined}
        position="relative"
      >
        <Flex alignItems="center" justifyContent="center" zIndex={10}>
          <Icon
            as={icon}
            fontSize="18px"
            color={isActive ? '#FFFFFF' : '#FAFAFA'}
            _groupHover={
              !isActive
                ? {
                    color: '#CCCCCC'
                  }
                : undefined
            }
          />
          <Text
            fontSize="sm"
            fontWeight={600}
            color={isActive ? '#FFFFFF' : '#FAFAFA'}
            transform="translateY(-1px)"
            ml={2}
            transition="color 200ms ease-in-out"
            _groupHover={
              !isActive
                ? {
                    color: '#CCCCCC'
                  }
                : undefined
            }
          >
            {title}
          </Text>
        </Flex>
        {isActive && (
          <Box
            borderRadius="full"
            bg="#2c2c2c"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            display="block"
            position="absolute"
            top="1px"
            left="1px"
          />
        )}
      </Flex>
    </Tooltip>
  )
}

const SidebarUserInfo = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    borderRadius: 'xxl',
    p: {
      lg: '0.3rem',
      xl: '0.4rem'
    },
    _hover: {
      bg: 'rgb(35, 38, 39)'
    }
  }
})

const PainelLayout = (props: PropsWithChildren) => {
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [switchOrganization] = useSwitchOrganization()
  const {
    isOpen: isSwitchAccountModalOpen,
    onOpen: onSwitchAccountModalOpen,
    onClose: onSwitchAccountModalClose
  } = useDisclosure()
  const {
    data: currentUserData,
    isLoading: isCurrentUserLoading,
    error: currentUserError
  } = useCurrentUser()
  const {
    data: currentOrganizationData,
    isLoading: isCurrentOrganizationLoading,
    error: currentOrganizationError
  } = useCurrentOrganization()
  const {
    data: currentUserOrganizations,
    isLoading: isCurrentUserOrganizationsLoading,
    error: currentUserOrganizationsError
  } = useCurrentUserOrganizations()
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(currentUserData?.photo_url)
  const {
    isOpen: isAccountModalOpen,
    onClose: onAccountModalClose,
    onOpen: onAccountModalOpen
  } = useDisclosure()
  const pathname = usePathname()

  if (typeof window !== 'undefined' && screenfull.isEnabled) {
    screenfull.on('change', () => {
      setIsFullscreen(screenfull.isFullscreen)
    })
  }

  useEffect(() => {
    const activeNavItem = navItemsList.findIndex((navItem) => navItem.route === pathname)
    setActiveNavItemIndex(activeNavItem)
  }, [pathname])

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await browserClient.storage.from('user_photos').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)

        setProfilePhotoUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (currentUserData?.photo_url) downloadImage(currentUserData?.photo_url)
  }, [currentUserData?.photo_url, browserClient])

  return (
    <>
      <Flex
        flexDirection="column"
        minHeight="100vh"
        bg="#000000"
        // bg="linear-gradient(140deg, rgba(105,95,78,0.5) 0%, rgba(105,95,78,1) 54%, rgba(105,95,78,0.1) 100%)"
        borderRadius="xxl"
        p={{ lg: 1 }}
        mb={1}
      >
        <LayoutHeader>
          <Box pl={{ lg: 2, xl: 2 }}>
            <img src="/rankttgold-logo.svg" width={120} />
          </Box>
          <SidebarNavWrapper>
            <HStack spacing={`${navItemSpacing}px`}>
              {navItemsList.map((navItem, navItemIndex) => (
                <SidebarNavItem
                  key={`nav-item-${navItemIndex}-${navItem.route}`}
                  route={navItem.route}
                  title={navItem.title}
                  icon={navItem.icon}
                  color={navItem.color}
                  isActive={navItemIndex === activeNavItemIndex}
                />
              ))}
            </HStack>
          </SidebarNavWrapper>

          <Menu closeOnSelect={false}>
            {({ isOpen }) => (
              <>
                <MenuButton>
                  <SidebarUserInfo bg={isOpen ? 'rgb(35, 38, 39, 0.5)' : undefined}>
                    <Avatar
                      size="sm"
                      width="42px"
                      height="42px"
                      name={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
                      backgroundColor="gray.400"
                      src={profilePhotoUrl}
                      boxShadow={!isOpen ? '0 0 0 4px rgba(70,62,48,0.8)' : undefined}
                    >
                      <AvatarBadge borderColor="rgb(35, 38, 39)" bg="green.500" boxSize="0.9rem" />
                    </Avatar>
                    <Box flex="1" ml={5} display={{ base: 'none', xxl: 'block' }}>
                      <Text textAlign="left" fontSize="sm" fontWeight={500} color="white">
                        {currentUserData?.first_name} {currentUserData?.last_name}
                      </Text>
                      <Text
                        textAlign="left"
                        fontSize="xs"
                        fontWeight={500}
                        color="rgba(232,236,239,.5)"
                        mt={{ base: '-0.2rem' }}
                      >
                        Conta pessoal
                      </Text>
                    </Box>
                    <Icon as={BiChevronDown} fontSize="1.5rem" color="white" ml={2} />
                  </SidebarUserInfo>
                </MenuButton>

                {/* <Button
              mt={6}
              py={5}
              width="100%"
              variant="outline"
              borderWidth="2px"
              colorScheme="gray"
              borderColor="rgb(52, 56, 57)"
              color="rgba(255,255,255,0.75)"
              fontSize="sm"
              _hover={{
                background: 'rgb(52, 56, 57)',
                color: 'white'
              }}
              onClick={onSwitchAccountModalOpen}
            >
              Trocar conta
            </Button> */}

                <MenuList>
                  <MenuGroup title="Conta pessoal">
                    <MenuItem
                      icon={
                        <Avatar
                          size="xs"
                          name={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
                        />
                      }
                    >
                      <Text>
                        {currentUserData?.first_name} {currentUserData?.last_name}
                      </Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Organizações">
                    {currentUserOrganizations &&
                      currentUserOrganizations.length > 0 &&
                      currentUserOrganizations.map((organization) => (
                        <MenuItem
                          key={organization.id}
                          icon={<Avatar size="xs" name={organization.name} />}
                          onClick={() => {
                            switchOrganization(organization.id)
                          }}
                        >
                          <Text
                            fontWeight={
                              currentOrganizationData?.id === organization.id ? 700 : undefined
                            }
                          >
                            {organization.name}
                          </Text>
                        </MenuItem>
                      ))}
                  </MenuGroup>
                  <MenuDivider />

                  <MenuGroup>
                    <MenuItem
                      icon={
                        isFullscreen ? <BiExitFullscreen size={22} /> : <BiFullscreen size={22} />
                      }
                      onClick={() => {
                        screenfull.toggle()
                      }}
                    >
                      {isFullscreen ? 'Desativar tela cheia' : 'Modo tela cheia'}
                    </MenuItem>
                    <MenuItem onClick={onAccountModalOpen} icon={<BiCog size={22} />}>
                      Preferências
                    </MenuItem>
                    <MenuItem icon={<BiLogOut size={22} />}>Sair</MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        </LayoutHeader>
        <ContentCardWrapper>
          <ContentCard>{props.children}</ContentCard>
        </ContentCardWrapper>
      </Flex>
      <AccountModal isOpen={isAccountModalOpen} onClose={onAccountModalClose} />
      <SwitchAccountModal isOpen={isSwitchAccountModalOpen} onClose={onSwitchAccountModalClose} />
    </>
  )
}

export default PainelLayout
