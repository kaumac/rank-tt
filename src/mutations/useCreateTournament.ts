import { useMutation, useQueryClient } from '@tanstack/react-query'

import { browserClient } from '@/supabase'
import { Tournament } from '@/types'

const handleCreateTournament = async (newTournamentData: { name: string }): Promise<Tournament> => {
  const organizationId = window.localStorage.getItem('currentOrganizationId')
  const { data, error: err } = await browserClient
    .from('tournaments')
    .insert({ name: newTournamentData.name, organization: organizationId })

  return data || newTournamentData
}

export const useCreateTournament = () => {
  const currentOrganizationId = window.localStorage.getItem('currentOrganizationId')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: handleCreateTournament,
    onSuccess: (data: Tournament) => {
      queryClient.setQueryData(['users', data.id], data)
    }
  })

  return mutation
}
