'use client'

import * as yup from 'yup'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useCreateOrganization } from '@/mutations'
import useCurrentUserOrganizations from '@/queries/useCurrentUserOrganizations'

const OrganizationsTab = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('O campo "Nome da organização" é obrigatório')
      .min(5, 'O nome da organização deve ter no mínimo 5 caracteres'),
    legal_agreement: yup
      .bool()
      .oneOf([true], 'Você deve concordar com os termos legais para criar uma organização')
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) })
  const {
    isOpen: isCreateOrganizationModalOpen,
    onOpen: onCreateOrganizationModalOpen,
    onClose: onCreateOrganizationModalClose
  } = useDisclosure()
  const {
    data: currentUserOrganizations,
    isLoading: isCurrentUserOrganizationsLoading,
    error: currentUserOrganizationsError
  } = useCurrentUserOrganizations()

  const createOrganization = useCreateOrganization()

  async function handleCreateOrganization(formData: { name: string }) {
    createOrganization.mutate({ name: formData.name })
  }

  return (
    <>
      <Modal
        isOpen={isCreateOrganizationModalOpen}
        onClose={onCreateOrganizationModalClose}
        isCentered
        size="full"
      >
        <ModalOverlay backdropFilter="blur(6px)" bg="rgba(22,22,22,0.66)" />
        <ModalContent p={12} alignItems="center" justifyContent="center">
          <ModalCloseButton
            borderRadius="full"
            border="2px solid #EAEAEA"
            width="36px"
            height="36px"
          />
          <Heading mb={4} size="md">
            Criar organização
          </Heading>
          <Stack
            width="600px"
            maxWidth="60vw"
            as="form"
            onSubmit={handleSubmit(handleCreateOrganization)}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel fontWeight="600" htmlFor="name">
                Nome da organização
              </FormLabel>
              <Input
                autoFocus={true}
                type="name"
                id="name"
                placeholder="Ex: Clube Viciados em Tenis de Mesa"
                size="lg"
                {...register('name')}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.legal_agreement}>
              <Checkbox
                {...register('legal_agreement')}
                color="gray.600"
                fontSize="10px"
                lineHeight={1}
                my={4}
              >
                Declaro para todos os fins legais que sou o(a) responsável por essa organização ou
                tenho autorização do(a) reponsável por essa organização
              </Checkbox>
              <FormErrorMessage>
                {errors.legal_agreement && errors.legal_agreement.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="flex-end" mt={4}>
              <Button
                mr={4}
                colorScheme="gray"
                size="lg"
                variant="outline"
                onClick={() => {
                  onCreateOrganizationModalClose()
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Criando organização..."
                colorScheme="blue"
                size="lg"
              >
                Criar organização
              </Button>
            </Flex>
          </Stack>
        </ModalContent>
      </Modal>
      <Box>
        <Heading size="lg">Organizações</Heading>
        {currentUserOrganizations && currentUserOrganizations.length > 0 ? (
          <>
            <Box>Organizações</Box>
            <Stack>
              {currentUserOrganizations.map((organization) => (
                <Box key={organization.id}>{organization.name}</Box>
              ))}
            </Stack>
          </>
        ) : (
          <Flex
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
            flexDirection="column"
            textAlign="center"
          >
            Você não está em nenhuma organização
            <br />
            Peça ao dono de uma organização para te adicionar ou crie uma organização
            <Flex mt={8}>
              <Button onClick={onCreateOrganizationModalOpen}>Criar organização</Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default OrganizationsTab
