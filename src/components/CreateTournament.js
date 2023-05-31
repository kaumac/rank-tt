import * as yup from 'yup'
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
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { useForm } from 'react-hook-form'

import useCreateTournament from '@/hooks/useCreateTournament'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('O campo "nome" é obrigatório')
    .min(5, 'O nome deve conter pelo menos 5 caracteres')
})

export const CreateTournament = ({ isOpen, onClose }) => {
  const [createdTournament, setCreatedTournament] = useState()
  const [createTournament] = useCreateTournament()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) })

  async function onSubmit(values) {
    const response = await createTournament({
      name: values.name
    }).then((docRef) => {
      setCreatedTournament({
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
        {!createdTournament ? (
          <>
            <ModalHeader>Criar competição</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize={14} mb={6} mr={24}>
                Essas e outras configurações como data, horário e formato da competição poderão ser
                alteradas depois nas configurações.
              </Text>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Nome da competição</FormLabel>
                <Input
                  id="name"
                  placeholder="Exemplo: Ranking ATEME (Maio/2023)"
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
                Criar competição
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
              <img src="/gifs/podium.gif" width="100px" />
              <Heading mt={4} size="md">
                Torneio criado!
              </Heading>
              <Text mt={2} textAlign="center">
                O torneio <strong>{createdTournament.name}</strong> foi criado com sucesso!
              </Text>

              <Text mt={4} textAlign="center">
                Agora você pode continuar a configuração do torneio e definir data, horário, formato
                dos jogos, etc.
              </Text>

              <Button
                as={Link}
                colorScheme="cyan"
                size="lg"
                mt={6}
                href={`/painel/torneios/${createdTournament.id}`}
              >
                Continuar configuração
              </Button>
            </Flex>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateTournament
