'use client'

import { Box, Flex, Icon, IconButton, Stack, Text, Tooltip, chakra } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BiHomeAlt, BiSearch, BiTrophy } from 'react-icons/bi'
import { VscLayoutSidebarLeft } from 'react-icons/vsc'

import { colors } from '@/theme'

const navItemHeight = 48
const navItemSpacing = 8

const navItemsList = [
  {
    title: 'Painel',
    route: '/painel',
    icon: BiHomeAlt,
    color: colors.blue[500],
    bgColor: 'rgba(45, 59, 111, 0.4)'
  },
  {
    title: 'Torneios',
    route: '/painel/torneios',
    icon: BiTrophy,
    color: colors.magenta[500],
    bgColor: 'rgba(87, 55, 114, 0.4)'
  },
  {
    title: 'Busca',
    icon: BiSearch,
    color: colors.green[500],
    bgColor: '#5A446C'
  }
]

const LayoutWrapper = chakra(Box, {
  baseStyle: {
    pr: {
      xl: '1.5rem'
    },
    pl: {
      xl: '20rem'
    },
    minHeight: '100vh',
    bg: 'rgb(20, 23, 24)'
  }
})

const ContentCardWrapper = chakra(Flex, {
  baseStyle: {
    py: {
      xl: '1.5rem'
    },
    minHeight: '100vh',
    flex: 1
  }
})

const ContentCard = chakra(Flex, {
  baseStyle: {
    bg: 'rgb(254, 254, 254)',
    borderRadius: '1.2rem',
    flex: 1
  }
})

const LayoutSidebar = chakra(Flex, {
  baseStyle: {
    pt: {
      xl: '7.5rem'
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
    height: '7.5rem',
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
    overflowY: 'auto'
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
        href={route ? route : undefined}
        width="100%"
        height={`${navItemHeight}px`}
        alignItems="center"
        px={5}
      >
        <Icon as={icon} fontSize="22px" color={color} />
        <Text
          fontSize="sm"
          fontWeight={500}
          color={isActive ? 'white' : 'rgba(255,255,255,0.75)'}
          ml={4}
          transition="color 200ms ease-in-out"
          _groupHover={{
            color: 'white'
          }}
        >
          {title}
        </Text>
      </Flex>
    </Tooltip>
  )
}

const ActiveSidebarNavItemBg = ({ activeItemIndex }: { activeItemIndex: number }) => {
  return (
    <Box
      backgroundImage={`linear-gradient(to left, rgb(50, 51, 55), ${navItemsList[activeItemIndex].bgColor})`}
      width="100%"
      height={`${navItemHeight}px`}
      position="absolute"
      transform={`translateY(${
        navItemHeight * activeItemIndex + navItemSpacing * activeItemIndex
      }px)`}
      top="0"
      left="0"
      borderRadius="lg"
      transitionProperty="background-image, transform"
      transitionTimingFunction="cubic-bezier(0.4,0,0.2,1)"
      transitionDuration="200ms"
      borderBottomColor="rgb(229, 231, 235)"
      borderBottomStyle="solid"
      zIndex={-1}
    />
  )
}

const PainelLayout = (props: PropsWithChildren) => {
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const activeNavItem = navItemsList.findIndex((navItem) => navItem.route === pathname)
    setActiveNavItemIndex(activeNavItem)
  }, [pathname])

  console.log(activeNavItemIndex)

  return (
    <LayoutWrapper>
      <LayoutSidebar>
        <SidebarHeader>
          <img src="/ranktt-new-logo.svg" width={150} />
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
                key={navItem.route}
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
      </LayoutSidebar>
      <ContentCardWrapper>
        <ContentCard>{props.children}</ContentCard>
      </ContentCardWrapper>
    </LayoutWrapper>
  )
}

export default PainelLayout
