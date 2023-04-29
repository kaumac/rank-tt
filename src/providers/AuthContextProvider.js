import { Center, Flex, Heading } from '@chakra-ui/react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import React from 'react'

import firebase_app from '@/firebase/config'

const auth = getAuth(firebase_app)

export const AuthContext = React.createContext({})

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <Center width="100vw" height="100vh" bg="gray.200">
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
