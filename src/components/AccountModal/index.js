'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { BiHomeAlt, BiUser } from 'react-icons/bi'
import { BsBuildingFill } from 'react-icons/bs'

import { useCurrentUser } from '@/hooks'

import AccountModalNavbar from './components/AccountModalNavbar'

const AccountModalContent = ({ onSuccess }) => {
  const [user, isUserLoading, userError] = useCurrentUser()
  const [activeNavItem, setActiveNavItem] = useState(0)
  const toast = useToast()

  return (
    <Flex>
      <AccountModalNavbar activeItem={activeNavItem} onNavItemClick={setActiveNavItem} />
      <Box flex="1" pl={12}>
        <Heading>Meu perfil</Heading>
        Account modal cojntent
      </Box>
    </Flex>
  )
}

const AccountModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(6px)" bg="rgba(22,22,22,0.66)" />
      <ModalContent borderRadius="xxl" maxWidth="780px" p={16}>
        <AccountModalContent
          onSuccess={() => {
            onClose()
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default AccountModal
