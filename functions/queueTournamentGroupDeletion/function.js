const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { logger } = require('firebase-functions')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')

const queueTournamentGroupDeletion = onDocumentCreated(
  '/queues/tournamentGroupDeletion/processing/{queueItemId}',
  async (event) => {
    const db = getFirestore()

    // The document/queue item data
    const data = event.data.data()

    // The parameters of the path to the document/queue item
    const params = event.params

    /**
     * ======================================
     * The function body
     * ======================================
     */
    logger.log('Deleting group ' + data.groupId + ' from tournament ' + data.tournamentId)

    const groupsRef = await db.collection('tournaments').doc(data.tournamentId).collection('groups')
    const groupRef = await groupsRef.doc(data.groupId)
    const groupData = (await groupRef.get()).data()

    await groupData.players.forEach(async (playerId) => {
      logger.log('Removing group ', data.groupId, ' reference from player ', playerId)
      await db
        .collection('tournaments')
        .doc(data.tournamentId)
        .collection('players')
        .doc(playerId)
        .update({
          group: FieldValue.delete(),
          groupNumber: FieldValue.delete()
        })
    })

    await groupsRef
      .where('number', '>', groupData.number)
      .get()
      .then(async (groupsSnapshot) => {
        groupsSnapshot.forEach(async (groupSnapshot) => {
          logger.log('Changing subsequent group number: group ', groupSnapshot.id)

          await groupSnapshot.ref.update({
            number: FieldValue.increment(-1)
          })
        })
      })

    await groupRef.delete()

    return event.data.ref.delete()
  }
)

module.exports = queueTournamentGroupDeletion
