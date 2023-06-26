'use client'

import { Box, Input } from '@chakra-ui/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

// const uploadButtonStyles = useMultiStyleConfig('Button', { variant: 'outline' })
const uploadButtonStyles = {}

export default function ProfilePhoto({ uid, url, size, onUpload }) {
  const supabase = createClientComponentClient()
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path) {
      console.log('download image')

      try {
        const { data, error } = await supabase.storage.from('user_photos').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)

        console.log('url url url')

        setProfilePhotoUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    console.log(url)

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadProfilePhoto = async (event) => {
    try {
      setIsUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabase.storage.from('user_photos').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading profile photo!')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      {profilePhotoUrl ? (
        <Image
          width={size}
          height={size}
          src={profilePhotoUrl}
          alt="ProfilePhoto"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <Box>sem foto carai</Box>
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {isUploading ? 'Uploading ...' : 'Upload'}
        </label>

        <Input
          type="file"
          sx={{
            '::file-selector-button': {
              border: 'none',
              outline: 'none',
              mr: 2,
              ...uploadButtonStyles
            }
          }}
          style={{
            visibility: 'hidden',
            position: 'absolute'
          }}
          id="single"
          accept="image/*"
          onChange={uploadProfilePhoto}
          disabled={isUploading}
        />
      </div>
    </div>
  )
}
