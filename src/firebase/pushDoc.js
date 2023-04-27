import { collection, addDoc } from 'firebase/firestore'

import { db } from './config'

export default async function pushDoc(path, data) {
  const isPathString = typeof path === 'string'

  const docRef = await addDoc(isPathString ? collectdion(db, path) : path, data)

  return docRef
}
