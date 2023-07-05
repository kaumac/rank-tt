'use client'

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  chakra,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BiCog, BiHomeAlt, BiTrophy } from 'react-icons/bi'
import { BsTerminal } from 'react-icons/bs'
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
    title: 'Painel',
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
    title: 'Super painel',
    icon: BsTerminal,
    color: colors.green[500],
    bgColor: '#5A446C'
  }
]

const LayoutWrapper = chakra(Box, {
  baseStyle: {
    pl: {
      xl: '20rem'
    },
    minHeight: '100vh',
    bg: '#F9FBFC'
  }
})

const ContentCardWrapper = chakra(Flex, {
  baseStyle: {
    pt: {
      xl: '1.5rem'
    },
    minHeight: '100vh',
    flex: 1
  }
})

const ContentCard = chakra(Flex, {
  baseStyle: {
    bg: 'rgb(254, 254, 254)',
    borderTopLeftRadius: '1.2rem',
    borderBottom: '1px solid #FFF',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
    flex: 1
  }
})

const LayoutSidebar = chakra(Flex, {
  baseStyle: {
    pt: {
      xl: '7rem'
    },
    pb: {
      xl: '14.5rem'
    },
    px: {
      xl: '1.0rem'
    },
    flexDirection: 'column',
    width: {
      xl: '20rem'
    },
    zIndex: 20,
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0
  }
})

const SidebarHeader = chakra(Flex, {
  baseStyle: {
    pr: {
      xl: '1.5rem'
    },
    pl: {
      xl: '1.75rem'
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7rem',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})

const SidebarNavWrapper = chakra(Box, {
  baseStyle: {
    position: 'relative',
    flex: 1,
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
        data-group
        zIndex={10}
        as={route ? Link : undefined}
        cursor="pointer"
        href={route ? route : undefined}
        width="100%"
        height={`${navItemHeight}px`}
        alignItems="center"
        px={5}
        borderRadius="sm"
        pointerEvents={isActive ? 'none' : undefined}
      >
        <Icon as={icon} fontSize="22px" color={color} />
        <Text
          fontSize="sm"
          fontWeight={600}
          color={isActive ? color : '#73716E'}
          ml={4}
          transition="color 200ms ease-in-out"
          _groupHover={
            !isActive
              ? {
                  color: '#4C4B4D'
                }
              : undefined
          }
        >
          {title}
        </Text>
      </Flex>
    </Tooltip>
  )
}

const ActiveSidebarNavItemBg = ({ activeItemIndex }: { activeItemIndex: number }) => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      height={`${navItemHeight}px`}
      position="absolute"
      transform={`translateY(${
        navItemHeight * activeItemIndex + navItemSpacing * activeItemIndex
      }px)`}
      top="0"
      left="0"
      borderRadius="sm"
      zIndex={-1}
      overflow="hidden"
      transitionProperty="transform"
      transitionTimingFunction="ease-out"
      transitionDuration="200ms"
      boxShadow={`inset 0 0 12px 0 ${navItemsList[activeItemIndex].color}, inset 1px -1px 0px 0px ${navItemsList[activeItemIndex].bgColor}, 0 2px 24px 0 rgba(0,0,0,0.05), 0 2px 6px 1px rgba(0,0,0,0.1), 1px 1px 0 0 #FFF`}
    >
      {navItemsList.map((navItemListItem, navItemIndex) => {
        const isBgActive = activeItemIndex === navItemIndex

        return (
          <Box
            key={`navbarItemBg-${navItemIndex}`}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="#FFF"
            backgroundImage={`radial-gradient(farthest-corner at 0px 0px, ${navItemsList[activeItemIndex].bgColor} 0%, #FFFFFF 50%)`}
            backgroundSize="300px 300px"
            transitionProperty="opacity"
            transitionTimingFunction="cubic-bezier(0.4,0,0.2,1)"
            transitionDuration="500ms"
            opacity={isBgActive ? 1 : 0}
          />
        )
      })}
    </Flex>
  )
}

const SidebarUserInfoWrapper = chakra(Box, {
  baseStyle: {
    px: {
      xl: 4
    },
    pb: {
      xl: '1.5rem'
    },
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})

const SidebarUserInfo = chakra(Box, {
  baseStyle: {
    borderRadius: 'sm',
    bg: 'rgb(35, 38, 39)',
    boxShadow:
      'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 0px 20px 24px 0px',
    p: {
      xl: '4'
    }
  }
})

const PainelLayout = (props: PropsWithChildren) => {
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
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
      <LayoutWrapper>
        <LayoutSidebar>
          <SidebarHeader>
            <img src="/new-ranktt-logo-light.svg" width={150} />
            <IconButton
              color="gray"
              colorScheme="black"
              bg="transparent"
              aria-label="Search database"
              icon={<VscLayoutSidebarLeft size="1.5rem" />}
            />
          </SidebarHeader>
          <SidebarNavWrapper>
            <Stack spacing={`${navItemSpacing}px`}>
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
            </Stack>

            <ActiveSidebarNavItemBg activeItemIndex={activeNavItemIndex} />
          </SidebarNavWrapper>

          <SidebarUserInfoWrapper>
            <SidebarUserInfo>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                py={2}
                px={3}
                pr={0}
                width="100%"
              >
                <Avatar
                  size="sm"
                  width="40px"
                  height="40px"
                  name={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
                  backgroundColor="gray.400"
                  src={profilePhotoUrl}
                >
                  <AvatarBadge borderColor="rgb(35, 38, 39)" bg="green.500" boxSize="0.9rem" />
                </Avatar>
                <Box flex="1" ml={5}>
                  <Text textAlign="left" fontSize="sm" fontWeight={500} color="white">
                    {currentUserData?.first_name} {currentUserData?.last_name}
                  </Text>
                  <Text
                    textAlign="left"
                    fontSize="xs"
                    fontWeight={500}
                    color="rgba(232,236,239,.5)"
                  >
                    Conta pessoal
                  </Text>
                </Box>
                <IconButton
                  color="gray"
                  colorScheme="black"
                  bg="transparent"
                  aria-label="Search database"
                  icon={<BiCog size="1.5rem" />}
                  onClick={onAccountModalOpen}
                />
              </Flex>

              <Button
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
              </Button>
            </SidebarUserInfo>
          </SidebarUserInfoWrapper>
        </LayoutSidebar>
        <ContentCardWrapper>
          <ContentCard>{props.children}</ContentCard>
        </ContentCardWrapper>
      </LayoutWrapper>
      <AccountModal isOpen={isAccountModalOpen} onClose={onAccountModalClose} />
      <SwitchAccountModal isOpen={isSwitchAccountModalOpen} onClose={onSwitchAccountModalClose} />
    </>
  )
}

export default PainelLayout
