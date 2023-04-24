const functions = require('firebase-functions')
const admin = require('firebase-admin')

const createOrganization = functions.firestore
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

module.exports = createOrganization
