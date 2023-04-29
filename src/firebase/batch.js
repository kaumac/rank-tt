import { writeBatch } from 'firebase/firestore'

import { db } from './config'

// Get a new write batch
const batch = writeBatch(db)

export default batch
