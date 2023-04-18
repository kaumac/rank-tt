import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'

import useCurrentOrganization from '@/hooks/useCurrentOrganization'

const DashboardHeader = ({ title }) => {
  const [currentOrganization, loading, error] = useCurrentOrganization()

  let navbarFilter = 'none'
  let navbarBackdrop = 'blur(3px)'
  let navbarShadow = 'none'
  let navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.8)',
    'rgba(11,20,55,0.5)'
  )
  let navbarBorder = 'transparent'
  let secondaryMargin = '0px'
  let paddingX = '15px'

  return (
    <Flex
      position="fixed"
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      borderWidth="1.5px"
      borderStyle="solid"
      left="12px"
      top="10px"
      width="calc(100% - 24px)"
      height="60px"
      flex="1"
      alignItems="center"
      px={4}
      pl={120}
    >
      <Heading size="sm">{currentOrganization?.name}</Heading>
      {title && (
        <Heading size="sm" ml={4}>
          / &nbsp; {title}
        </Heading>
      )}
    </Flex>
  )
}

export default DashboardHeader
