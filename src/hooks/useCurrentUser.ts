import { useCallback, useEffect, useState } from 'react'

import { browserClient } from '@/supabase'
import { User } from '@/types'

import { useAuthContext } from './useAuthContext'

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { session } = useAuthContext()

  const sessionUser = session?.user

  const getProfile = useCallback(async () => {
    try {
      let { data, error, status } = await browserClient
        .from('users')
        .select()
        // .eq('id', sessionUser?.id)
        .maybeSingle()

      if (data) {
        setUser({
          ...data
        } as User)
      }

      console.log(user)

      if (error && status !== 406) {
        throw error
      }
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setIsUserLoading(false)
    }
  }, [sessionUser, browserClient])

  useEffect(() => {
    if (sessionUser) {
      getProfile()
    }
  }, [sessionUser, getProfile])

  return [user, isUserLoading, error]
}

export default useCurrentUser
