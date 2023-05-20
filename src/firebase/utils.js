export const indexCollectionDocsById = (firebaseCollectionSnapshot) => {
  return (firebaseCollectionSnapshot?.docs || []).reduce((accObject, documentSnapshot) => {
    return Object.assign(accObject, {
      [documentSnapshot.id]: documentSnapshot
    })
  }, {})
}

export const groupCollectionDocsByField = (firebaseCollectionSnapshot, field) => {
  return (firebaseCollectionSnapshot?.docs || []).reduce((accObject, documentSnapshot) => {
    return Object.assign(accObject, {
      [documentSnapshot.data()[field]]: accObject[documentSnapshot.data()[field]]
        ? accObject[documentSnapshot.data()[field]].concat(documentSnapshot)
        : [].concat(documentSnapshot)
    })
  }, {})
}
