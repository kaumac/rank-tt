const admin = require('firebase-admin')

const createOrganization = require('./createOrganization/function')
const createTournament = require('./createTournament/function')
const writeUserData = require('./writeUserData/function')

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

module.exports = {
  createOrganization,
  createTournament,
  writeUserData
}
