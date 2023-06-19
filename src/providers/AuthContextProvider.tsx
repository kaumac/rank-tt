'use client'

import { Center, Flex, Heading } from '@chakra-ui/react'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import { browserClient } from '@/supabase'

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<{ session: Session } | { session: null }>({
    session: null
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getData() {
      const { data } = await browserClient.auth.getSession()
      if (data.session) {
        setSession(data)
        setLoading(false)
      } else {
        setSession({ session: null })
        setLoading(false)
        router.push('/login')
      }
    }

    getData()
  }, [])

  console.log(session)

  return (
    <AuthContext.Provider value={{ session }}>
      {loading ? (
        <Center width="100vw" height="100vh" position="absolute" top="0" left="0">
          <Flex
            flexDirection="column"
            width="240px"
            height="240px"
            alignItems="center"
            justifyContent="center"
            bg="white"
            borderRadius="240px"
            boxShadow="xl"
          >
            <img src="/gifs/ping-pong.gif" width="100px" />
            <Heading size="sm">Carregando...</Heading>
          </Flex>
        </Center>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
