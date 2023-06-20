'use client'

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
  ModalContent,
  ModalOverlay,
  Stack,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { browserClient } from '@/supabase'

const LoginModalContent = ({ onSuccess }) => {
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)
  const toast = useToast()

  const schema = yup.object().shape({
    email: yup.string().required('O campo "email" é obrigatório'),
    password: yup
      .string()
      .required('O campo "senha" é obrigatório')
      .min(6, 'A senha deve conter pelo menos 6 caracteres')
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) })

  async function signIn(formData) {
    setIsLoginSubmitting(true)
    const { error } = await browserClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      toast({
        title: 'Usuário ou senha inválidos',
        description: 'Sua senha está inválida ou não existe um usuário com esse e-mail.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    } else {
      setErrorMsg(null)
      onSuccess()
    }

    setIsLoginSubmitting(false)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(signIn)}>
      <Heading size="lg">Acesse sua conta</Heading>
      <Flex alignItems="center" mt={1} mb={8}>
        <Heading size="sm" fontWeight="normal" color="gray.500">
          Ainda não tem uma conta?
        </Heading>
        <Button ml={1} variant="link">
          Cadastre-se
        </Button>
      </Flex>
      <Stack>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Endereço de e-mail</FormLabel>
          <Input
            autoFocus={true}
            type="email"
            id="email"
            placeholder="Seu endereço de e-mail"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input placeholder="Sua senha" type="password" id="password" {...register('password')} />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button variant="link">Esqueceu sua senha?</Button>
        <Button
          colorScheme="black"
          type="submit"
          size="lg"
          isLoading={isLoginSubmitting}
          loadingText="Entrando..."
        >
          Entrar
        </Button>
      </Flex>
    </Box>
  )
}

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(6px)" bg="rgba(255,255,255,0.5)" />
      <ModalContent
        borderRadius="xl"
        background="linear-gradient(125deg, #ECFCFF 0%, #ECFCFF 20%, #B2FCFF calc(40% + 1px), #B2FCFF 30%, #5EDFFF calc(60% + 1px), #5EDFFF 36%, #3E64FF calc(72% + 1px), #3E64FF 50%);"
      >
        <Flex width="100%">
          <Box>sodkfkods</Box>
          <Box p={10} bg="white" borderRadius="xl" flex="1">
            <LoginModalContent
              onSuccess={() => {
                onClose()
              }}
            />
          </Box>
        </Flex>
      </ModalContent>
      <Box
        background="linear-gradient(115deg, #000000 0%, #00C508 55%, #000000 100%), linear-gradient(115deg, #0057FF 0%, #020077 100%), conic-gradient(from 110deg at -5% 35%, #000000 0deg, #FAFF00 360deg), conic-gradient(from 220deg at 30% 30%, #FF0000 0deg, #0000FF 220deg, #240060 360deg), conic-gradient(from 235deg at 60% 35%, #0089D7 0deg, #0000FF 180deg, #240060 360deg);
background-blend-mode: soft-light, soft-light, overlay, screen, normal;"
        width="100vw"
        height="100vh"
        display="block"
        position="fixed"
        top="0"
        left="0"
        opacity={0.5}
      />
    </Modal>
  )
}

export default LoginModal
