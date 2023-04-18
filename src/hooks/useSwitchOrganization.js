import { useRouter } from 'next/navigation'
import useLocalStorageState from 'use-local-storage-state'

function useSwitchOrganization() {
  const router = useRouter()
  const [currentOrgId, setOrgId] = useLocalStorageState('currentOrganizationId')

  const switchOrganization = (newOrgId) => {
    if (newOrgId) {
      setOrgId(newOrgId)
      console.log('switched to ', currentOrgId)
      router.replace(`/painel`)
    }
  }

  return [switchOrganization]
}

export default useSwitchOrganization
