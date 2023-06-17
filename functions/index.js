const { initializeApp } = require('firebase-admin/app')

const createOrganization = require('./createOrganization/function')
const createTournament = require('./createTournament/function')
const writeUserData = require('./writeUserData/function')
const queueTournamentGroupDeletion = require('./queueTournamentGroupDeletion/function')
const queueTournamentStart = require('./queueTournamentStart/function')

initializeApp()

module.exports = {
  createOrganization,
  createTournament,
  writeUserData,
  queueTournamentGroupDeletion,
  queueTournamentStart
}
