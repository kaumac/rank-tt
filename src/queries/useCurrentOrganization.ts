import { useQuery } from '@tanstack/react-query'
import useLocalStorageState from 'use-local-storage-state'

import { browserClient } from '@/supabase'
import { Organization } from '@/types'

export const useCurrentOrganization = () => {
  const [currentOrgId] = useLocalStorageState('currentOrganizationId')

  return useQuery({
    enabled: !!currentOrgId,
    queryKey: ['current-organization', currentOrgId],
    queryFn: async (): Promise<Organization> => {
      const { data: currrentOrganizationData } = await browserClient
        .from('organizations')
        .select()
        .eq('id', currentOrgId)
        .single()

      return currrentOrganizationData
    }
  })
}

export default useCurrentOrganization
