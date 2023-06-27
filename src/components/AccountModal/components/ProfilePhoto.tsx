'use client'

import { Avatar, Box, Button, Flex, FormControl, Input, InputGroup, Text } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BsCamera, BsCameraFill } from 'react-icons/bs'

import { browserClient } from '@/supabase'

interface ProfilePhotoProps {
  uid?: string
  url?: string
  onUpload?: (url: string) => void
}

const ProfilePhoto = ({ uid, url, onUpload }: ProfilePhotoProps) => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(url)
  const [isUploading, setIsUploading] = useState(false)
  const [profilePhotoUploadError, setProfilePhotoUploadError] = useState()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await browserClient.storage.from('user_photos').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)

        setProfilePhotoUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, browserClient])

  const uploadProfilePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const eventFiles = event?.target?.files as FileList

    try {
      setIsUploading(true)

      if (!eventFiles || eventFiles.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = eventFiles[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let { error: uploadError } = await browserClient.storage
        .from('user_photos')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload && onUpload(filePath)
    } catch (error: any) {
      setProfilePhotoUploadError(error)
      alert('Error uploading profile photo!')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    value.target.files && uploadProfilePhoto(value)
  }

  return (
    <div>
      {profilePhotoUrl ? (
        <Flex>
          <Avatar size="xl" src={profilePhotoUrl} mr={8} />
          <Box>
            <FormControl isInvalid={profilePhotoUploadError}>
              <InputGroup onClick={handleClick}>
                <input
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  id="profilePhotoUpload"
                  ref={inputRef}
                  hidden
                />
                <Button
                  variant="outline"
                  leftIcon={<BsCameraFill />}
                  isLoading={false}
                  colorScheme="gray"
                  size="lg"
                  fontSize="md"
                >
                  Enviar foto
                </Button>
              </InputGroup>
            </FormControl>
            <Text color="gray.500" mt={4} fontSize="xs">
              A foto deve ter no máximo 1MB.
              <br />O tamanho indicado é 512x512 pixels.
            </Text>
          </Box>
        </Flex>
      ) : (
        <Box>sem foto carai</Box>
      )}
    </div>
  )
}

export default ProfilePhoto
