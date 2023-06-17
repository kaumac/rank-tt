const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { logger } = require('firebase-functions')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')

const queueTournamentStart = onDocumentCreated(
  '/queues/tournamentStart/processing/{queueItemId}',
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
    logger.log('Starting tournament ' + data.tournamentId)

    const tournamentRef = await db.collection('tournaments').doc(data.tournamentId)
    const groupsRef = await tournamentRef.collection('groups')
    const categoriesRef = await tournamentRef.collection('categories')
    const gamesRef = await tournamentRef.collection('games')
    const playersRef = await tournamentRef.collection('players')

    const tournamentData = (await tournamentRef.get()).data()

    await categoriesRef.get().then(async (categoriesSnapshot) => {
      categoriesSnapshot.forEach(async (categorySnapshot) => {
        const categoryPlayers = await playersRef.where('category', '==', categorySnapshot.id)

        await categoryPlayers.get().then(async (playersSnapshot) => {
          logger.log(playersSnapshot, playersSnapshot.size)

          const playersCount = playersSnapshot.size
          let tournamentGameStages = ['groupGames']

          if (playersCount > 64) {
            tournamentGameStages.push('roundOf64')
          }

          if (playersCount > 32) {
            tournamentGameStages.push('roundOf32')
          }

          if (playersCount > 16) {
            tournamentGameStages.push('eightFinals')
          }

          if (playersCount > 8) {
            tournamentGameStages.push('quarterFinals')
          }

          if (playersCount > 4) {
            tournamentGameStages.push('semiFinals')
          }

          if (playersCount > 2) {
            tournamentGameStages.push('final')
          }

          gamesRef.doc(categorySnapshot.id).set({
            id: categorySnapshot.id,
            createdAt: FieldValue.serverTimestamp(),
            status: 'ongoing',
            stages: tournamentGameStages
          })
        })

        //     logger.log('Creating category games', categorySnapshot.id)

        //     const newGameCategoryRef = gamesRef.doc(categorySnapshot.id)

        //     await newGameCategoryRef.set({
        //       id: categorySnapshot.id,
        //       createdAt: FieldValue.serverTimestamp(),
        //       status: 'ongoing'
        //     })

        //     // Continuar trabalho:

        //     // !!!!!!!! Usar query para filtrar os grupos por categoria!

        //     //
      })
    })

    await groupsRef.get().then(async (groupsSnapshot) => {
      groupsSnapshot.forEach(async (groupSnapshot) => {
        logger.log('Creating group games', groupSnapshot.id)

        const groupData = await groupSnapshot.data()

        const newGameGroupRef = gamesRef
          .doc(groupData.category)
          .collection('groupGames')
          .doc(groupSnapshot.id)

        await newGameGroupRef.set({
          id: groupSnapshot.id,
          groupId: groupSnapshot.id,
          groupNumber: groupData.number,
          createdAt: FieldValue.serverTimestamp(),
          status: 'pending'
        })

        logger.log('Populating group games data', groupData.id)

        groupData.players.forEach(async (playerId) => {
          groupData.players.forEach(async (opponentId) => {
            if (playerId !== opponentId) {
              const newMatchRef = newGameGroupRef.collection('matches').doc()
              newMatchRef.set({
                id: newMatchRef.id,
                createdAt: FieldValue.serverTimestamp(),
                status: 'pending',
                player1: playerId,
                player2: opponentId,
                scores: [],
                finalScore: {
                  player1: null,
                  player2: null
                }
              })
            }
          })
        })
      })
    })

    // await groupData.players.forEach(async (playerId) => {
    //   logger.log('Removing group ', data.groupId, ' reference from player ', playerId)
    //   await db
    //     .collection('tournaments')
    //     .doc(data.tournamentId)
    //     .collection('players')
    //     .doc(playerId)
    //     .update({
    //       group: FieldValue.delete(),
    //       groupNumber: FieldValue.delete()
    //     })
    // })

    // await groupsRef
    //   .where('number', '>', groupData.number)
    //   .get()
    //   .then(async (groupsSnapshot) => {
    //     groupsSnapshot.forEach(async (groupSnapshot) => {
    //       logger.log('Changing subsequent group number: group ', groupSnapshot.id)

    //       await groupSnapshot.ref.update({
    //         number: FieldValue.increment(-1)
    //       })
    //     })
    //   })

    await tournamentRef.update({
      status: 'started'
    })

    return event.data.ref.delete()
  }
)

module.exports = queueTournamentStart
