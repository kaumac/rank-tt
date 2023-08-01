import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  SimpleGrid,
  Text
} from '@chakra-ui/react'

import { useCurrentUser, useSwitchOrganization } from '@/hooks'
import { useCurrentUserOrganizations } from '@/queries'
import { BiCheck } from 'react-icons/bi'

export interface SwitchAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AccountCardProps {
  isActive?: boolean
  name?: string
  privilege?: string
  photoUrl?: string
  onClick: () => void
}

const AccountCard = ({ isActive, name, privilege, photoUrl, onClick }: AccountCardProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p={4}
      borderRadius="md"
      backdropFilter="blur(6px)"
      bg="#FFFFFF"
      flexDirection="column"
      onClick={onClick}
      border="2px solid"
      borderColor={isActive ? 'brand.500' : "border.primary"}
      cursor="pointer"
      pointerEvents={isActive ? 'none' : undefined}
    >
      <Center width="32px" height="32px" borderRadius="full" border="2px solid" borderColor={isActive ? 'brand.500' : "border.primary"} position="absolute" top="16px" right="16px" bg={isActive ? 'brand.500' : 'white'}>
        <Icon as={BiCheck} opacity={isActive ? 1 : 0} color="white" fontSize="xl"/>
      </Center>
      <Avatar bg="gray.200" color="gray.600" name={name} src={photoUrl} borderRadius="md"/>
      <Heading size="sm" mt={4} color="gray.900">
        {name}
      </Heading>
      <Text mt={1} fontWeight={500} fontSize="sm" color="gray.500">{privilege || 'Staff'}</Text>
    </Flex>
  )
}

export const SwitchAccountModal = ({ isOpen, onClose }: SwitchAccountModalProps) => {
  const { data: currentUserData } = useCurrentUser()
  const { data: currentUserOrganizations } = useCurrentUserOrganizations()
  const [switchOrganization] = useSwitchOrganization()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(6px)" bg="rgba(237,239, 242, 0.95)" />
      <ModalContent>
        <ModalCloseButton
          borderRadius="full"
          border="2px solid #EAEAEA"
          width="48px"
          height="48px"
          transform="translate(30px, -30px)"
          background="white"
          boxShadow="-18px 22px 10px 0 #FFF, 3px -3px 6px 3px rgba(0,0,0,0.05)"
        />

          <Box p={6}>
            <Heading size="md" fontWeight={700}>
              Selecione uma conta
            </Heading>
            <Text color="#5D5C62">
              Selecione a conta que deseja utilizar
            </Text>
          </Box>

          <Divider borderColor="border.primary" />

          <SimpleGrid columns={2} spacing={4} p={6}>
            <AccountCard
              isActive
              privilege="Proprietário"
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
          </SimpleGrid>

          <Divider borderColor="border.primary" />

          <Flex justifyContent="flex-end" p={6}>
            <Button
              variant="ghost"
              color="gray.500"
              fontWeight={500}
              fontSize="sm"
              mr={4}
              onClick={onClose}
              borderRadius="full"
            >
              Cancelar
            </Button>
            <Button
              colorScheme="black"
              fontWeight={600}
              fontSize="sm"
              borderRadius="full"
              onClick={onClose}
            >
              Gerenciar conta selecionada
            </Button>

          </Flex>
            
        
      </ModalContent>
    </Modal>
  )
}

export default SwitchAccountModal
