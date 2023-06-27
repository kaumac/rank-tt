'use client'

import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BsBuildingFill, BsPersonFill } from 'react-icons/bs'

interface AccountModalNavbarProps {
  activeItem: number
  onNavItemClick: (itemIndex: number) => void
}

const navItemHeight = 40
const navItemSpacing = 8

const navItemsList = [
  {
    title: 'Minha conta',
    icon: BsPersonFill
  },
  {
    title: 'Organizações',
    icon: BsBuildingFill
  }
]

interface NavBarItem {
  title: string
  icon: IconType
  isActive: boolean
  onClick: () => void
}

const NavBarItem = ({ title, icon, isActive, onClick }: NavBarItem) => {
  return (
    <Flex
      height={`${navItemHeight}px`}
      alignItems="center"
      px={4}
      onClick={onClick}
      cursor="pointer"
      borderRadius="full"
      _hover={{
        backgroundColor: 'gray.100'
      }}
    >
      <Icon
        as={icon}
        mr={2}
        color={isActive ? 'black' : 'gray.600'}
        transitionProperty="color"
        transitionTimingFunction="cubic-bezier(0.4,0,0.2,1)"
        transitionDuration="200ms"
      />
      <Text
        fontWeight={600}
        color={isActive ? 'black' : 'gray.600'}
        transitionProperty="color"
        transitionTimingFunction="cubic-bezier(0.4,0,0.2,1)"
        transitionDuration="200ms"
        fontSize="sm"
      >
        {title}
      </Text>
    </Flex>
  )
}

const ActiveSidebarNavItemBg = ({ activeItemIndex }: { activeItemIndex: number }) => {
  return (
    <Box
      width="100%"
      height={`${navItemHeight}px`}
      position="absolute"
      transform={`translateY(${
        navItemHeight * activeItemIndex + navItemSpacing * activeItemIndex
      }px)`}
      top="0"
      left="0"
      borderRadius="full"
      borderWidth="2px"
      borderColor="blue.500"
      transitionProperty="background-image, transform"
      transitionTimingFunction="cubic-bezier(0.4,0,0.2,1)"
      transitionDuration="200ms"
      zIndex={999}
    />
  )
}

const AccountModalNavbar = ({ activeItem, onNavItemClick }: AccountModalNavbarProps) => {
  return (
    <Box width={200} position="relative">
      <Stack spacing={`${navItemSpacing}px`}>
        {navItemsList.map((navItem, navItemIndex) => (
          <NavBarItem
            key={`nav-item-${navItemIndex}`}
            title={navItem.title}
            icon={navItem.icon}
            isActive={activeItem === navItemIndex}
            onClick={() => {
              onNavItemClick(navItemIndex)
            }}
          />
        ))}
      </Stack>
      <ActiveSidebarNavItemBg activeItemIndex={activeItem} />
    </Box>
  )
}

export default AccountModalNavbar
