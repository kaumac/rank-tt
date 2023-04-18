import useLocalStorageState from 'use-local-storage-state'

import { pushDoc } from '@/firebase'
import useCurrentOrganization from '@/hooks/useCurrentOrganization'
import useCurrentUser from '@/hooks/useCurrentUser'

function useCreateTournament() {
  const [currentOrganization] = useCurrentOrganization()
  const [currentUser] = useCurrentUser()

  const createTournament = async (data) => {
    const createdTournament = await pushDoc('queueTournamentCreation', {
      ...data,
      createdBy: currentUser?.id,
      organizationId: currentOrganization?.id
    })

    return createdTournament
  }

  return [createTournament]
}

export default useCreateTournament
