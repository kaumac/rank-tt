'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { useAuthContext } from '@/providers/AuthContextProvider'

function Page() {
  const { user } = useAuthContext()
  const router = useRouter()

  React.useEffect(() => {
    if (user == null) router.push('/')
  }, [user, router])

  return (
    <div>
      <Button
        variant="light"
        fontSize="sm"
        borderRadius="16px"
        w={{ base: '128px', md: '148px' }}
        h="46px"
      >
        Prev
      </Button>
      <h1>Only logged in users can view this page</h1>
    </div>
  )
}

export default Page
