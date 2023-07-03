import { useMutation, useQueryClient } from '@tanstack/react-query'

import { browserClient } from '@/supabase'
import { Organization } from '@/types'

const handleCreateOrganization = async (newOrganizationData: {
  name: string
}): Promise<Organization> => {
  const { data, error: err } = await browserClient
    .from('organizations')
    .insert({ name: newOrganizationData.name })

  return data || newOrganizationData
}

export const useCreateOrganization = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: handleCreateOrganization,
    onSuccess: (data: Organization) => {
      queryClient.setQueryData(['users', data.id], data)
    }
  })

  return mutation
}
