import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@/hooks'
import { browserClient } from '@/supabase'
import { OrganizationProfile, User } from '@/types'

export const useCurrentUserOrganizations = () => {
  const { session } = useAuthContext()

  const currentUserId = session?.user?.id

  return useQuery({
    enabled: !!currentUserId,
    queryKey: ['user-organizations', currentUserId],
    queryFn: async (): Promise<OrganizationProfile[]> => {
      const { data: currentUserOrganizationsData } = await browserClient
        .from('organization_members')
        .select('organization(id, name)')
        .eq('user', currentUserId)

      const flattenedOrganizations = (currentUserOrganizationsData || []).flatMap(
        (organization: any) => {
          return organization.organization
        }
      )

      return flattenedOrganizations
    }
  })
}

export default useCurrentUserOrganizations
