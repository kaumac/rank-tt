import { doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

import { db } from '@/firebase'

function useTournament(tournamentId) {
  const [value, loading, error] = useDocument(
    doc(db, 'tournaments', tournamentId || 'undefined'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [value?.data(), loading, error]
}

export default useTournament
