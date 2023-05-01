export const indexCollectionDocsById = (firebaseCollectionSnapshot) => {
  return (firebaseCollectionSnapshot?.docs || []).reduce(
    (accObject, documentSnapshot) => {
      return Object.assign(accObject, {
        [documentSnapshot.id]: documentSnapshot.data()
      })
    },
    {}
  )
}
