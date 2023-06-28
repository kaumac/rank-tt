import { useMutation, useQueryClient } from '@tanstack/react-query'

import { browserClient } from '@/supabase'
import { User } from '@/types'

const handleUpdateUser = async (newUserData: User): Promise<User> => {
  const { data, error: err } = await browserClient
    .from('users')
    .upsert({
      id: newUserData.id,
      first_name: newUserData.first_name,
      last_name: newUserData.last_name,
      // username,
      // website,
      // avatar_url,
      updated_at: new Date().toISOString()
    })
    .single()

  return data || newUserData
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: handleUpdateUser,
    onSuccess: (data: User) => {
      queryClient.setQueryData(['users', data.id], data)
    }
  })

  return mutation
}
