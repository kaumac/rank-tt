import { doc } from 'firebase/firestore'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

import { db } from '@/firebase'

function useOrganization(organizationId) {
  const [value, loading, error] = useDocumentOnce(
    doc(db, 'organizations', organizationId || 'xpto'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [value?.data(), loading, error]
}

export default useOrganization
