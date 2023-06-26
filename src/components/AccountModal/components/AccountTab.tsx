'use client'

import * as yup from 'yup'
import { Box, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useCurrentUser } from '@/hooks'

import ProfilePhoto from './ProfilePhoto'

const AccountTab = () => {
  const { currentUser, isCurrentUserLoading, currentUserError } = useCurrentUser()
  const [isProfileUpdating, setIsProfileUpdating] = useState(true)
  const toast = useToast()

  const schema = yup.object().shape({
    first_name: yup.string().required('O campo "Nome" é obrigatório'),
    last_name: yup.string().required('O campo "Sobrenome" é obrigatório'),
    email: yup.string().required('O campo "Email" é obrigatório'),
    username: yup.string().required('O campo "Nome de usuário" é obrigatório'),
    photo_url: yup.string().required('O campo "Nome de usuário" é obrigatório')
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (currentUser) {
      reset({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        username: currentUser.username,
        photo_url: currentUser.photo_url
      })
    }
  }, [currentUser])

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setIsProfileUpdating(true)

      let { error } = await supabase.from('profiles').upsert({
        id: currentUser?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setIsProfileUpdating(false)
    }
  }

  console.log(currentUser)

  return (
    <Box>
      <Heading size="lg">Meu perfil</Heading>
      <ProfilePhoto
        uid={currentUser?.id}
        url={currentUser?.photo_url}
        size={150}
        onUpload={(url: string) => {
          // setAvatarUrl(url)
          // updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      Account modal cojntent
    </Box>
  )
}

export default AccountTab
