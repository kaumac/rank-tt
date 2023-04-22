// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Firestore under the path /messages/:organizationId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection('messages')
//     .add({ original: original })
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` })
// })

// Listens for new messages added to /messages/:organizationId/original and creates an
// uppercase version of the message to /messages/:organizationId/uppercase
exports.createOrganization = functions.firestore
  .document('/queueOrganizationCreation/{organizationId}')
  .onCreate(async (snap, context) => {
    // Grab the current value of what was written to Firestore.
    const data = snap.data()
    const db = admin.firestore()

    // Access the parameter `{organizationId}` with `context.params`
    functions.logger.log(
      'Creating the organization ',
      context.params.organizationId,
      data
    )
    functions.logger.log(data)
    functions.logger.log(context.params)

    await db
      .collection('users')
      .doc(data.createdBy)
      .update({
        organizations: admin.firestore.FieldValue.arrayUnion(
          context.params.organizationId
        )
      })

    const newOrgRef = db
      .collection('organizations')
      .doc(context.params.organizationId)

    await newOrgRef.set({
      name: data.name,
      owners: [data.createdBy],
      tournaments: [],
      id: context.params.organizationId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: data.createdBy
    })

    // Deletes the queue object
    return snap.ref.delete()
  })

exports.createTournament = functions.firestore
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
      players: [],
      tables: [],
      categories: [],
      settings: {},
      organizationId: data.organizationId,
      id: context.params.tournamentId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: data.createdBy
    })

    // Deletes the queue object
    return snap.ref.delete()
  })

exports.writeUserData = functions.auth.user().onCreate(async (user) => {
  // Get a reference to the Firestore database
  const db = admin.firestore()
  // Create a new document in the users collection
  const userRef = db.collection('users').doc(user.uid)
  // Set the data for the new document
  await userRef.set({
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    organizations: [],
    id: user.uid
  })
})
