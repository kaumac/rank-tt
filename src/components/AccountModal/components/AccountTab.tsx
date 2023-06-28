'use client'

import * as yup from 'yup'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useCurrentUser } from '@/hooks'
import { browserClient } from '@/supabase'
import { User } from '@/types'

import ProfilePhoto from './ProfilePhoto'

const AccountTab = () => {
  const {
    data: currentUserData,
    isLoading: isCurrentUserLoading,
    error: currentUserError
  } = useCurrentUser()
  const [isProfileUpdating, setIsProfileUpdating] = useState(false)
  const toast = useToast()
  const queryClient = useQueryClient()

  const schema = yup.object().shape({
    first_name: yup.string().required('O campo "Nome" é obrigatório'),
    last_name: yup.string().required('O campo "Sobrenome" é obrigatório'),
    // email: yup.string().required('O campo "Email" é obrigatório'),
    // username: yup.string().required('O campo "Nome de usuário" é obrigatório'),
    photo_url: yup.string()
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (currentUserData) {
      reset({
        first_name: currentUserData.first_name,
        last_name: currentUserData.last_name,
        // last_name: currentUserData.last_name,
        // email: currentUserData.email,
        // username: currentUserData.username,
        photo_url: currentUserData.photo_url
      })
    }
  }, [currentUserData])

  async function updateProfile(formData: User) {
    try {
      setIsProfileUpdating(true)

      let { error } = await browserClient.from('users').upsert({
        id: currentUserData?.id,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        // username,
        // website,
        // avatar_url,
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setIsProfileUpdating(false)
    }
  }

  async function updateProfilePhoto(photoUrl: string) {
    try {
      setIsProfileUpdating(true)

      let { error } = await browserClient.from('users').upsert({
        id: currentUserData?.id,
        photo_url: photoUrl,
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setIsProfileUpdating(false)
    }
  }

  return (
    <Box>
      <Heading size="lg">Meu perfil</Heading>
      <Text color="gray.500" my={8}>
        Configure seu perfil. Essas informações são públicas e utlizadas nas incrições e durante os
        torneios.
      </Text>
      <Box mt={8}>
        <Heading fontWeight={500} fontSize="sm">
          Foto de perfil
        </Heading>
        <Divider my={4} />
        <ProfilePhoto
          uid={currentUserData?.id}
          url={currentUserData?.photo_url}
          onUpload={(url: string) => {
            updateProfilePhoto(url)
          }}
        />
      </Box>
      <Heading fontWeight={500} fontSize="sm" mt={8}>
        Informações básicas
      </Heading>
      <Divider my={4} />
      <Box as="form" onSubmit={handleSubmit(updateProfile)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.first_name}>
            <FormLabel htmlFor="first_name">Nome</FormLabel>
            <Input
              autoFocus={true}
              id="first_name"
              placeholder="Digite seu nome"
              {...register('first_name')}
            />
            <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.last_name}>
            <FormLabel htmlFor="last_name">Sobrenome</FormLabel>
            <Input
              autoFocus={true}
              id="last_name"
              placeholder="Digite seu sobrenome"
              {...register('last_name')}
            />
            <FormErrorMessage>{errors.last_name && errors.last_name.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          mt={8}
          colorScheme="black"
          type="submit"
          size="lg"
          isLoading={isProfileUpdating}
          loadingText="Salvando..."
        >
          Salvar perfil
        </Button>
      </Box>
    </Box>
  )
}

export default AccountTab
