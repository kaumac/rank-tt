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
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { useForm } from 'react-hook-form'

import useSwitchOrganization from '@/hooks/useSwitchOrganization'
import useUser from '@/hooks/useUser'
import createOrganization from '@/setters/createOrganization'

export const CreateOrganization = ({ isOpen, onClose }) => {
  const [user] = useUser()
  const [createdOrg, setCreatedOrg] = useState()
  const [switchOrganization] = useSwitchOrganization()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  async function onSubmit(values) {
    const response = await createOrganization({
      name: values.name
    }).then((docRef) => {
      setCreatedOrg({
        ...values,
        id: docRef.id
      })

      return docRef
    })

    return response
  }

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size="xl">
      <ModalOverlay />
      <ModalContent>
        {!createdOrg ? (
          <>
            <ModalHeader>Criar organização</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  id="name"
                  placeholder="Exemplo: Associação Esportiva Recreativa Ateme"
                  {...register('name', {
                    required: 'Este campo é obrigatório',
                    minLength: {
                      value: 4,
                      message: 'O nome deve conter pelo menos 4 caracteres'
                    }
                  })}
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button
                isLoading={isSubmitting}
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit(onSubmit)}
              >
                Criar organização
              </Button>
            </ModalFooter>
          </>
        ) : (
          <ModalBody>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              p={8}
              position="relative"
            >
              <Box position="absolute" top="0">
                <ConfettiExplosion />
              </Box>
              <img src="/gifs/thumbs-up.gif" width="100px" />
              <Heading mt={4} size="md">
                Organização criada!
              </Heading>
              <Text mt={2} textAlign="center">
                A organização <strong>{createdOrg.name}</strong> foi criada com sucesso!
                <br />
                Clique no botão abaixo para gerenciar essa organização e começar a organizar
                competições!
              </Text>

              <Button
                colorScheme="cyan"
                size="lg"
                mt={6}
                onClick={() => {
                  switchOrganization(createdOrg.id)
                  onClose()
                }}
              >
                Gerenciar organização
              </Button>
            </Flex>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateOrganization
