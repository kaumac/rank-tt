const functions = require('firebase-functions')
const admin = require('firebase-admin')

const writeUserData = functions.auth.user().onCreate(async (user) => {
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

module.exports = writeUserData
