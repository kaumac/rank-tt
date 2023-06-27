'use client'

import { Box, Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'

import AccountModalNavbar from './components/AccountModalNavbar'
import AccountTab from './components/AccountTab'
import OrganizationsTab from './components/OrganizationsTab'

const accountModalSections = [AccountTab, OrganizationsTab]

const AccountModalContent = ({ onSuccess }) => {
  const [activeNavItem, setActiveNavItem] = useState(0)

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
        <ModalCloseButton
          borderRadius="full"
          border="2px solid #EAEAEA"
          width="36px"
          height="36px"
        />
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
