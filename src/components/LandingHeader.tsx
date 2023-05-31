import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Spacer,
  Stack,
  chakra,
  useDisclosure
} from '@chakra-ui/react'
import { BiMenu } from 'react-icons/bi'

const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Organizar evento', link: '/organizar-evento' }
  // { name: "Pricing", link: "#pricing" },
]

const DesktopSidebarContents = () => {
  return (
    <Container maxW={['full', 'container.lg']} p={0}>
      <Stack justify="space-between" p={[0, 4]} w="full" direction={['column', 'row']}>
        <Box display={{ base: 'none', md: 'flex' }}>
          <img src="/ranktt-logo.svg" width={150} />
        </Box>
        <Spacer />
        <Stack align="flex-start" spacing={[4, 10]} direction={['column', 'row']}>
          {navLinks.map((navLink: any, i: number) => {
            return (
              <Link href={navLink.link} key={`navlink_${i}`} fontWeight={500} variant="ghost">
                {navLink.name}
              </Link>
            )
          })}
        </Stack>
        <Spacer />
        <LinkBox>
          <LinkOverlay href={`https://twitter.com/thisissukh_`} isExternal>
            <Image alt="twitter" src="twitter.svg"></Image>
          </LinkOverlay>
        </LinkBox>
      </Stack>
    </Container>
  )
}
const MobileSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex w="full" align="center">
        LPLPLPLP
        <Spacer />
        <IconButton aria-label="Search database" icon={<BiMenu />} onClick={onOpen} />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent bg="gray.50">
            <DrawerCloseButton />
            <DrawerHeader>LPLPLPLP</DrawerHeader>

            <DrawerBody>
              <DesktopSidebarContents />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  )
}

const Sidebar = () => {
  return (
    <chakra.header id="header">
      <Box display={{ base: 'flex', md: 'none' }} p={4}>
        <MobileSidebar />
      </Box>

      <Box display={{ base: 'none', md: 'flex' }} bg="gray.50">
        <DesktopSidebarContents />
      </Box>
    </chakra.header>
  )
}

export const Header = () => {
  return (
    <Box w="full">
      <Sidebar />
    </Box>
  )
}
