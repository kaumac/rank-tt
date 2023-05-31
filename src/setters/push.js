import { addDoc, collection, updateDoc } from 'firebase/firestore'

import { db } from '@/firebase'

export default async function push(path, data) {
  const docRef = await addDoc(typeof path === 'string' ? collection(db, path) : data, data)

  return docRef
}
