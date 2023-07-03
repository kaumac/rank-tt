'use client'

import { useDisclosure } from '@chakra-ui/react'
import { Session } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'

import { LoginModal } from '@/components'
import { browserClient } from '@/supabase'

interface AuthContextProps {
  session?: Session
  isSessionLoading: boolean
  isAuthModalOpen: boolean
  onAuthModalOpen: () => void
  onAuthModalClose: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  session: undefined,
  isSessionLoading: true,
  isAuthModalOpen: false,
  onAuthModalOpen: () => {},
  onAuthModalClose: () => {}
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | undefined>(undefined)
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
        setSession(undefined)
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
