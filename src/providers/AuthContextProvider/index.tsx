'use client'

import { Center, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

import { LoginModal } from '@/components'
import { browserClient } from '@/supabase'

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const {
    isOpen: isAuthModalOpen,
    onOpen: onAuthModalOpen,
    onClose: onAuthModalClose
  } = useDisclosure()

  useEffect(() => {
    async function getData() {
      const { data } = await browserClient.auth.getSession()

      if (data.session) {
        setSession(data.session)
        setIsSessionLoading(false)
      } else {
        setSession(null)
        setIsSessionLoading(false)
        onAuthModalOpen()
      }
    }

    getData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ session, isSessionLoading, isAuthModalOpen, onAuthModalOpen, onAuthModalClose }}
    >
      {children}
      <LoginModal isOpen={isAuthModalOpen} onClose={onAuthModalClose} />
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
