'use client'

import { Box, Flex, Icon, IconButton, Stack, Text, Tooltip, chakra } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BiHomeAlt, BiTrophy } from 'react-icons/bi'
import { VscLayoutSidebarLeft } from 'react-icons/vsc'

import { colors } from '@/theme'

const navItemHeight = 48
const navItemSpacing = 2

const navItemsList = [
  {
    title: 'Painel',
    route: '/painel',
    icon: BiHomeAlt,
    color: colors.blue[500],
    bgColor: 'red'
  },
  {
    title: 'Torneios',
    route: '/painel/torneios',
    icon: BiTrophy,
    color: colors.magenta[500],
    bgColor: 'red'
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
  route: string
  title: string
  color: string
  icon: IconType
}

const SidebarNavItem = ({ route, title, color, icon }: SidebarNavItemProps) => {
  return (
    <Tooltip hasArrow label={title} placement="auto" zIndex={10} isDisabled>
      <Flex
        zIndex={10}
        as={Link}
        href={route}
        width="100%"
        height={`${navItemHeight}px`}
        alignItems="center"
        px={5}
      >
        <Icon as={icon} fontSize="22px" color={color} />
        <Text fontSize="sm" fontWeight={500} color="white" ml={4}>
          {title}
        </Text>
      </Flex>
    </Tooltip>
  )
}

const ActiveSidebarNavItemBg = ({ activeItemIndex }: { activeItemIndex: number }) => {
  return (
    <Box
      backgroundImage="linear-gradient(to left, rgb(50, 51, 55), rgba(70, 79, 111, 0.3))"
      width="100%"
      height={`${navItemHeight}px`}
      position="absolute"
      top={`${navItemHeight * activeItemIndex + navItemSpacing * activeItemIndex}px`}
      left="0"
      borderRadius="lg"
      transitionProperty="color,background-color,border-color,text-decoration-color,fill,stroke"
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
          <Stack spacing={navItemSpacing}>
            {navItemsList.map((navItem, index) => (
              <SidebarNavItem
                key={navItem.route}
                route={navItem.route}
                title={navItem.title}
                icon={navItem.icon}
                color={navItem.color}
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
