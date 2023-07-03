import { useRouter } from 'next/navigation'
import useLocalStorageState from 'use-local-storage-state'

export const useSwitchOrganization = () => {
  const router = useRouter()
  const [currentOrgId, setOrgId] = useLocalStorageState('currentOrganizationId')

  const switchOrganization = (newOrgId: string | undefined) => {
    setOrgId(newOrgId)
    router.replace(`/painel`)
  }

  return [switchOrganization]
}
