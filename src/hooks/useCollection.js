import { useEffect, useRef, useState } from "react";
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [isPending, setIspending] = useState(false)
  const [error, setError] = useState(null)
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current


  useEffect(() => {
    setIspending(true)
    let ref = projectFirestore.collection(collection)

    if(query) {
      ref = ref.where(...query)
    }

    if(orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsub = ref.onSnapshot(snapshot => {
      let results = []

      snapshot.docs.forEach(doc => {
        results.push({...doc, id: doc.id})
      })

      setDocuments(results)
      setIspending(false)
      setError(null)
    }, err => {
      setError(err.message)
      setIspending(false)
      setDocuments(null)
    })

    return () => unsub()

  }, [query, orderBy,collection])

  return {documents, isPending, error}

}