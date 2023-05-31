import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'

import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentData,
  useFirestoreDocumentDeletion,
  useFirestoreQuery
} from '@react-query-firebase/firestore'
import { useState } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

import { db } from '@/firebase'

function useTournament(tournamentId) {
  const ref = doc(db, 'tournaments', tournamentId || 'undefined')
  const query = useFirestoreDocumentData(['tournaments', tournamentId], ref, {
    subscribe: true
  })

  return query
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
export const useTournamentCategoryPlayers = (tournamentId = 'null', categoryId = 'null') => {
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
export const useTournamentCategoryGroups = (tournamentId = 'null', categoryId = 'null') => {
  const groupsRef = collection(db, 'tournaments', tournamentId, 'groups')

  const groupsQuery = query(groupsRef, where('category', '==', categoryId), orderBy('number'))

  const [snapshot, loading, error] = useCollection(groupsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true }
  })

  if (error) console.warn(error)

  return [snapshot, loading, error]
}

// Delete a tournament group by id
export const useDeleteTournamentGroup = (tournamentId, groupId) => {
  const queueCollection = collection(db, 'queues', tournamentId, 'groups')
  const groupRef = doc(groupsCollection, groupId)
  const mutation = useFirestoreDocumentDeletion(groupRef)

  return mutation
}

export const useQueueTournamentGroupDeletion = (tournamentId, groupId) => {
  const [isDone, setIsDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const queueRef = collection(db, 'queues', 'tournamentGroupDeletion', 'processing')

  const useMutation = useFirestoreCollectionMutation(queueRef, {
    onMutate: async (groupId) => {
      setIsLoading(true)
    },
    onSuccess: (queueRef) => {
      const unsubscribe = onSnapshot(queueRef, (updatedQueueRef) => {
        const updatedQueueData = updatedQueueRef.data()
        if (updatedQueueData === undefined) {
          setIsLoading(false)
          setIsDone(true)
          unsubscribe()
        }
      })
    }
  })

  const mutate = async () => {
    useMutation.mutate({
      groupId: groupId,
      tournamentId: tournamentId
    })
  }

  return { mutate, isDone, isLoading, error }
}

export default useTournament
