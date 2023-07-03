import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'

import { useCurrentUser, useSwitchOrganization } from '@/hooks'
import { useCurrentUserOrganizations } from '@/queries'

export interface SwitchAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AccountCardProps {
  name?: string
  photoUrl?: string
  onClick: () => void
}

const AccountCard = ({ name, photoUrl, onClick }: AccountCardProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p={8}
      borderRadius="md"
      mt={4}
      backdropFilter="blur(6px)"
      bg="rgba(20,20,20,0.80)"
      flexDirection="column"
      onClick={onClick}
    >
      <Avatar mt={-14} src={photoUrl} />
      <Heading size="sm" mt={4} color="white">
        {name}
      </Heading>
      <Button mt={4} colorScheme="black" onClick={onClick}>
        Selecionar
      </Button>
    </Flex>
  )
}

export const SwitchAccountModal = ({ isOpen, onClose }: SwitchAccountModalProps) => {
  const { data: currentUserData } = useCurrentUser()
  const { data: currentUserOrganizations } = useCurrentUserOrganizations()
  const [switchOrganization] = useSwitchOrganization()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
      <ModalOverlay backdropFilter="blur(6px)" bg="rgba(32,110,241,0.66)" />
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
        <HStack>
          <AccountCard
            name={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
            photoUrl={currentUserData?.photo_url}
            onClick={() => {
              switchOrganization(undefined)
              onClose()
            }}
          />
          {currentUserOrganizations?.map((organization) => (
            <AccountCard
              key={organization.id}
              name={organization.name}
              photoUrl={organization.photo_url}
              onClick={() => {
                switchOrganization(organization.id)
                onClose()
              }}
            />
          ))}
        </HStack>
      </ModalContent>
    </Modal>
  )
}

export default SwitchAccountModal
