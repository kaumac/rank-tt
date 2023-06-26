import { useCallback, useEffect, useState } from 'react'

import { browserClient } from '@/supabase'
import { User } from '@/types'

import { useAuthContext } from './useAuthContext'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isCurrentUserLoading, setIsCurrentUserLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { session } = useAuthContext()

  const sessionUser = session?.user

  const getUser = useCallback(async () => {
    try {
      let { data, error, status } = await browserClient
        .from('users')
        .select()
        .eq('id', sessionUser?.id)
        .maybeSingle()

      if (data) {
        setCurrentUser({
          ...data
        } as User)
      }

      if (error && status !== 406) {
        throw error
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setIsCurrentUserLoading(false)
    }
  }, [sessionUser, browserClient])

  useEffect(() => {
    if (sessionUser) {
      getUser()
    }
  }, [sessionUser, getUser])

  return { currentUser, isCurrentUserLoading, currentUserError: error }
}

export default useCurrentUser
