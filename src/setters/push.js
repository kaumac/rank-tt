import { collection, addDoc, updateDoc } from 'firebase/firestore'

import { db } from '@/firebase'

export default async function push(path, data) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, path), data)

  return docRef
}
