import { doc, collection, query, where, orderBy } from 'firebase/firestore'
import { useDocument, useCollection } from 'react-firebase-hooks/firestore'

import { db } from '@/firebase'

function useTournament(tournamentId) {
  const [value, loading, error] = useDocument(
    doc(db, 'tournaments', tournamentId || 'undefined'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  if (error) console.warn(error)

  return [value, loading, error]
}

/**
 * Category hooks
 */

export const useTournamentCategories = (tournamentId) => {
  const [snapshot, loading, error] = useCollection(
    collection(db, 'tournaments', tournamentId || 'undefined', 'categories'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  if (error) console.warn(error)

  return [snapshot, loading, error]
}

/**
 * Player hooks
 */

// Get player by id
export const useTournamentPlayer = (tournamentId, playerId) => {
  const [value, loading, error] = useDocument(
    doc(db, 'tournaments', tournamentId || 'undefined'),
    'players',
    playerId,
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  if (error) console.warn(error)

  return [value, loading, error]
}

// Get all tournament players
export const useTournamentPlayers = (tournamentId) => {
  const [snapshot, loading, error] = useCollection(
    collection(db, 'tournaments', tournamentId || 'undefined', 'players'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  if (error) console.warn(error)

  return [snapshot, loading, error]
}

// Tournament players filtered by category
export const useTournamentCategoryPlayers = (
  tournamentId = 'null',
  categoryId = 'null'
) => {
  const playersRef = collection(db, 'tournaments', tournamentId, 'players')

  const playersQuery = query(playersRef, where('category', '==', categoryId))

  const [snapshot, loading, error] = useCollection(playersQuery, {
    snapshotListenOptions: { includeMetadataChanges: true }
  })

  if (error) console.warn(error)

  return [snapshot, loading, error]
}

/**
 * Group hooks
 */

// Get all tournament groups
export const useTournamentGroups = (tournamentId) => {
  const [snapshot, loading, error] = useCollection(
    collection(db, 'tournaments', tournamentId || 'undefined', 'groups'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  if (error) console.warn(error)

  return [snapshot, loading, error]
}

// Tournament groups filtered by category
export const useTournamentCategoryGroups = (
  tournamentId = 'null',
  categoryId = 'null'
) => {
  const groupsRef = collection(db, 'tournaments', tournamentId, 'groups')

  const groupsQuery = query(
    groupsRef,
    where('category', '==', categoryId),
    orderBy('number')
  )

  const [snapshot, loading, error] = useCollection(groupsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true }
  })

  if (error) console.warn(error)

  return [snapshot, loading, error]
}

export default useTournament
