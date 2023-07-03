import {
  Avatar,
  Box,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'
import { useState } from 'react'

import { useCurrentUser } from '@/hooks'
import { useCurrentUserOrganizations } from '@/queries'

export interface SwitchAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SwitchAccountModal = ({ isOpen, onClose }: SwitchAccountModalProps) => {
  const { data: currentUserData } = useCurrentUser()
  const { data: currentUserOrganizations } = useCurrentUserOrganizations()
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
      <ModalOverlay backdropFilter="blur(6px)" bg="rgba(66,66,66,0.66)" />
      <ModalContent
        p={12}
        background="transparent"
        boxShadow="none"
        alignItems="center"
        justifyContent="center"
      >
        <ModalCloseButton
          borderRadius="full"
          border="2px solid #EAEAEA"
          color="white"
          width="48px"
          height="48px"
        />
        <Heading color="rgba(255,255,255,0.8)" size="lg" mb={12} mt={-12}>
          Selecione uma conta
        </Heading>
        {currentUserOrganizations?.map((organization) => (
          <Flex
            key={organization.id}
            alignItems="center"
            justifyContent="center"
            p={8}
            borderRadius="md"
            mt={4}
            backdropFilter="blur(6px)"
            bg="rgba(20,20,20,0.80)"
            flexDirection="column"
          >
            <Avatar mt={-14} />
            <Heading size="sm" mt={4} color="white">
              {organization.name}
            </Heading>
          </Flex>
        ))}
      </ModalContent>
    </Modal>
  )
}

export default SwitchAccountModal
