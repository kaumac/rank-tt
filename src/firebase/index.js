import auth from './auth'
import batch from './batch'
import { app, config, db } from './config'
import pushDoc from './pushDoc'
import updateDoc from './updateDoc'
import { indexCollectionDocsById } from './utils'

export { auth, app, db, config, pushDoc, updateDoc, batch, indexCollectionDocsById }

export default app
