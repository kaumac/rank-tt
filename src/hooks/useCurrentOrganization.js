import { doc } from 'firebase/firestore'

import { useDocument } from 'react-firebase-hooks/firestore'
import useLocalStorageState from 'use-local-storage-state'

import { db } from '@/firebase'

function useCurrentOrganization(id) {
  const [currentOrgId] = useLocalStorageState('currentOrganizationId')
  const [value, loading, error] = useDocument(doc(db, 'organizations', currentOrgId || 'xpto'), {
    snapshotListenOptions: { includeMetadataChanges: true }
  })

  return [value?.data(), loading, error]
}

export default useCurrentOrganization
