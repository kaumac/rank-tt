import { doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

import { auth, db } from '@/firebase'

function useCurrentUser() {
  const [value, loading, error] = useDocument(
    doc(db, 'users', auth?.currentUser?.uid || 'undefined'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [value?.data(), loading, error]
}

export default useCurrentUser
