import { useQuery } from '@tanstack/react-query'

import { browserClient } from '@/supabase'
import { User } from '@/types'

import { useAuthContext } from './useAuthContext'

export const useCurrentUser = () => {
  const { session } = useAuthContext()

  const currentUserId = session?.user?.id

  return useQuery({
    enabled: !!currentUserId,
    queryKey: ['users', currentUserId],
    queryFn: async (): Promise<User> => {
      const { data: currentUserData } = await browserClient
        .from('users')
        .select()
        .eq('id', currentUserId)
        .single()

      return currentUserData
    }
  })
}

export default useCurrentUser
