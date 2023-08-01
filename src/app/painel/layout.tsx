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
import { BiChevronDown, BiCog, BiHomeAlt, BiTrophy } from 'react-icons/bi'
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
      xl: '0.4rem'
    },
    pt: {
      xl: '0.4rem'
    },
    pb: {
      xl: '0.6rem'
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
        data-group
        whiteSpace="nowrap"
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
        <Icon as={icon} fontSize="22px" color={isActive ? color : '#FFFFFF'} _groupHover={
            !isActive
              ? {
                  color: '#CCCCCC'
                }
              : undefined
          }/>
        <Text
          fontSize="sm"
          fontWeight={600}
          color={isActive ? color : '#FFFFFF'}
          ml={4}
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
      bgColor="#FFF"
    >
    </Flex>
  )
}

const SidebarUserInfo = chakra(Flex, {
  baseStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    cursor: 'pointer',
    borderRadius: 'xxl',
    p: {
      xl: '0.2rem'
    },
    _hover: {
      bg: 'rgb(35, 38, 39)',
    }
  },
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
      <Box minHeight='100vh' bgColor='#161819' borderRadius="xxl" p={{ xl: 1}}>
        <LayoutHeader>
          {/* <IconButton
            color="gray"
            colorScheme="black"
            bg="transparent"
            aria-label="Search database"
            icon={<VscLayoutSidebarLeft size="1.5rem" />}
          /> */}
          <img src="/new-ranktt-logo-light.svg" width={120} />
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

            <ActiveSidebarNavItemBg activeItemIndex={activeNavItemIndex} />
          </SidebarNavWrapper>

          <SidebarUserInfo>
            
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
            <Box flex="1" ml={5}>
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
            <IconButton
              color="gray"
              variant="ghost"
              bg="transparent"
              aria-label="Search database"
              icon={<BiChevronDown size="1.5rem" />}
              onClick={onAccountModalOpen}
            />

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
          </SidebarUserInfo>
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
