import { useState, useEffect, useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const initialState = {
  document: null,
  success: null,
  error: null,
  isPending: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        success: true,
        isPending: false,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { document: null, success: true, isPending: false, error: null };
    case "IS_PENDING":
      return { isPending: true, error: null, document: null, success: false };
    case "ERROR":
      return {
        isPending: false,
        error: action.payload,
        document: null,
        success: false,
      };
    default:
      return { ...state };
  }
};

export const useFirestore = (collection) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const ref = projectFirestore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch("IS_PENDING");

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add(...doc, createdAt);

      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response };
};
