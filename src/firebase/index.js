import auth from './auth'
import batch from './batch'
import firebaseApp, { db } from './config'
import pushDoc from './pushDoc'
import updateDoc from './updateDoc'
import { indexCollectionDocsById } from './utils'

export { auth, db, pushDoc, updateDoc, batch, indexCollectionDocsById }

export default firebaseApp
