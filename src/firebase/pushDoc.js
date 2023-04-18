import { collection, addDoc } from 'firebase/firestore'

import { db } from './config'

export default async function pushDoc(path, data) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, path), data)

  return docRef
}
