import auth from './auth'
import batch from './batch'
import firebaseApp, { db } from './config'
import pushDoc from './pushDoc'
import updateDoc from './updateDoc'

export { auth, db, pushDoc, updateDoc, batch }

export default firebaseApp
