import { useQuery } from '@tanstack/react-query'
import useLocalStorageState from 'use-local-storage-state'

import { browserClient } from '@/supabase'
import { Organization } from '@/types'

export const useCurrentOrganization = () => {
  const [currentOrgId] = useLocalStorageState('currentOrganizationId')

  return useQuery({
    enabled: !!currentOrgId,
    queryKey: ['organizations', currentOrgId],
    queryFn: async (): Promise<Organization> => {
      const { data: currentOrganizationData } = await browserClient
        .from('organizations')
        .select()
        .eq('id', currentOrgId)
        .single()

      return currentOrganizationData
    }
  })
}

export default useCurrentOrganization
