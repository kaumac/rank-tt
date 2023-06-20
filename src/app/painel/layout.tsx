'use client'

import { Box, Flex, chakra } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const ContentWrapper = chakra(Box, {
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
    borderRadius: '1.5rem',
    flex: 1
  }
})

const PainelLayout = (props: PropsWithChildren) => {
  return (
    <ContentWrapper>
      <ContentCardWrapper>
        <ContentCard>{props.children}</ContentCard>
      </ContentCardWrapper>
    </ContentWrapper>
  )
}

export default PainelLayout
