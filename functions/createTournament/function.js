const functions = require('firebase-functions')
const admin = require('firebase-admin')

const createTournament = functions.firestore
  .document('/queueTournamentCreation/{tournamentId}')
  .onCreate(async (snap, context) => {
    // Grab the current value of what was written to Firestore.
    const data = snap.data()
    const db = admin.firestore()

    functions.logger.log(
      'Creating the tournament ',
      context.params.tournamentId,
      data
    )
    functions.logger.log(data)
    functions.logger.log(context.params)

    await db
      .collection('organizations')
      .doc(data.organizationId)
      .update({
        tournaments: admin.firestore.FieldValue.arrayUnion(
          context.params.tournamentId
        )
      })

    const newTournamentRef = db
      .collection('tournaments')
      .doc(context.params.tournamentId)

    await newTournamentRef.set({
      name: data.name,
      settings: {},
      organizationId: data.organizationId,
      id: context.params.tournamentId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: data.createdBy
    })

    // Deletes the queue object
    return snap.ref.delete()
  })

module.exports = createTournament
