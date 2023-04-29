import { doc, collection } from 'firebase/firestore'
import { useDocument, useCollection } from 'react-firebase-hooks/firestore'

import { db } from '@/firebase'

function useTournament(tournamentId) {
  const [value, loading, error] = useDocument(
    doc(db, 'tournaments', tournamentId || 'undefined'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [value, loading, error]
}

export const useTournamentPlayers = (tournamentId) => {
  const [snapshot, loading, error] = useCollection(
    collection(db, 'tournaments', tournamentId || 'undefined', 'players'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [snapshot, snapshot?.docs, loading, error]
}

export const useTournamentCategories = (tournamentId) => {
  console.log(tournamentId, 'useTournamentCategories tournamentId')
  const [snapshot, loading, error] = useCollection(
    collection(db, 'tournaments', tournamentId || 'undefined', 'categories'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  return [snapshot, snapshot?.docs, loading, error]
}

export default useTournament
