'use client'

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text,
  Tooltip,
  chakra,
  useDisclosure
} from '@chakra-ui/react'
import screenfull from 'screenfull'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import {
  BiChevronDown,
  BiCog,
  BiHomeAlt,
  BiTrophy,
  BiSearch,
  BiExitFullscreen,
  BiFullscreen,
  BiRadioCircleMarked,
  BiRadioCircle,
  BiTransferAlt,
  BiUser,
  BiLogOut
} from 'react-icons/bi'
import { VscLayoutSidebarLeft } from 'react-icons/vsc'

import { SwitchAccountModal } from '@/components'
import AccountModal from '@/components/AccountModal'
import useCurrentUser from '@/hooks/useCurrentUser'
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
    minHeight: '100vh',
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
            width={{ lg: 'calc(100% - 1px)', xl: 'calc(100% - 2px)' }}
            height={{ lg: 'calc(100% - 1px)', xl: 'calc(100% - 2px)' }}
            display="block"
            position="absolute"
            top={{ lg: '', xl: '1px' }}
            left={{ lg: '', xl: '1px' }}
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
      xl: '0.2rem'
    },
    _hover: {
      bg: 'rgb(35, 38, 39)'
    }
  }
})

const PainelLayout = (props: PropsWithChildren) => {
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
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
      <Box
        minHeight="100vh"
        bg="linear-gradient(140deg, rgba(105,95,78,0.5) 0%, rgba(105,95,78,1) 54%, rgba(105,95,78,0.1) 100%)"
        borderRadius={{ lg: 'xl', xl: 'xxl' }}
        p={{ lg: 1 }}
        mb={1}
      >
        <LayoutHeader>
          {/* <IconButton
            color="gray"
            colorScheme="black"
            bg="transparent"
            aria-label="Search database"
            icon={<VscLayoutSidebarLeft size="1.5rem" />}
          /> */}
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
                      width="36px"
                      height="36px"
                      name={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
                      backgroundColor="gray.400"
                      src={profilePhotoUrl}
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

                <MenuList border="4px solid #000" borderRadius="xl" p={0}>
                  <MenuGroup title="Contas">
                    <MenuItem icon={<Avatar size="sm" name="Hugo Calderano" />}>
                      <Text>Hugo Calderano</Text>
                    </MenuItem>
                    <MenuItem
                      icon={<Avatar size="sm" name="Associação Esportiva Recreativa Ateme" />}
                    >
                      <Text fontWeight={700}>Associação Esportiva Recreativa Ateme</Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />

                  <MenuGroup>
                    <MenuItem
                      icon={
                        isFullscreen ? <BiExitFullscreen size={20} /> : <BiFullscreen size={20} />
                      }
                      onClick={() => {
                        screenfull.toggle()
                      }}
                    >
                      {isFullscreen ? 'Desativar tela cheia' : 'Modo tela cheia'}
                    </MenuItem>
                    <MenuItem icon={<BiCog size={20} />}>Preferências</MenuItem>
                    <MenuItem
                      icon={<BiLogOut size={20} />}
                      borderBottomLeftRadius="lg"
                      borderBottomRightRadius="lg"
                    >
                      Sair
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        </LayoutHeader>
        <ContentCardWrapper>
          <ContentCard>{props.children}</ContentCard>
        </ContentCardWrapper>
      </Box>
      <AccountModal isOpen={isAccountModalOpen} onClose={onAccountModalClose} />
      <SwitchAccountModal isOpen={isSwitchAccountModalOpen} onClose={onSwitchAccountModalClose} />
    </>
  )
}

export default PainelLayout
