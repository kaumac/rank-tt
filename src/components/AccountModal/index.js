'use client'

import { Box, Flex, Modal, ModalContent, ModalOverlay, useToast } from '@chakra-ui/react'
import { useState } from 'react'

import { useCurrentUser } from '@/hooks'

import AccountModalNavbar from './components/AccountModalNavbar'
import AccountTab from './components/AccountTab'
import OrganizationsTab from './components/OrganizationsTab'

const accountModalSections = [AccountTab, OrganizationsTab]

const AccountModalContent = ({ onSuccess }) => {
  const [user, isUserLoading, userError] = useCurrentUser()
  const [activeNavItem, setActiveNavItem] = useState(0)
  const toast = useToast()

  return (
    <Flex>
      <AccountModalNavbar activeItem={activeNavItem} onNavItemClick={setActiveNavItem} />
      <Box flex="1" pl={12}>
        {activeNavItem === 0 && <AccountTab />}
        {activeNavItem === 1 && <OrganizationsTab />}
      </Box>
    </Flex>
  )
}

const AccountModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(6px)" bg="rgba(22,22,22,0.66)" />
      <ModalContent borderRadius="xxl" maxWidth="780px" p={12}>
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
