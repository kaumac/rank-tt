import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@/hooks'
import { browserClient } from '@/supabase'
import { OrganizationProfile, Tournament, User } from '@/types'

import { useCurrentOrganization } from './useCurrentOrganization'

export const useCurrentOrganizationTournaments = () => {
  const {
    data: currentOrganizationData,
    isLoading: isCurrentOrganizationLoading,
    error: currentOrganizationError
  } = useCurrentOrganization()

  return useQuery({
    enabled: !!currentOrganizationData?.id,
    queryKey: ['organization-tournaments', currentOrganizationData?.id],
    queryFn: async (): Promise<Tournament[]> => {
      const { data: currentOrganizationTournamentsData } = await browserClient
        .from('tournaments')
        .select('name, id')
        .eq('organization', currentOrganizationData?.id)

      return currentOrganizationTournamentsData as Tournament[]
    }
  })
}

export default useCurrentOrganizationTournaments
