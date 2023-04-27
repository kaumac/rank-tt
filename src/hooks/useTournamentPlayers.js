import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { db } from '@/firebase'

function useTournamentPlayers(tournamentId) {
  const [value, loading, error, snapshot] = useCollectionData(
    collection(db, 'tournaments', tournamentId || 'undefined', 'players'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [value, loading, error, snapshot]
}

export default useTournamentPlayers
