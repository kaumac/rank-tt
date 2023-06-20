'use client'

import { Box, Flex, IconButton, chakra } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { VscLayoutSidebarLeft } from 'react-icons/vsc'

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

const PainelLayout = (props: PropsWithChildren) => {
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
      </LayoutSidebar>
      <ContentCardWrapper>
        <ContentCard>{props.children}</ContentCard>
      </ContentCardWrapper>
    </LayoutWrapper>
  )
}

export default PainelLayout
