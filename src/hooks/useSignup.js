import { useEffect, useState } from "react";
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  const signup = async (username, email, password, thumbnail) => {
    setIsPending(true);
    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgURL = await img.ref.getDownloadURL()

      if(!imgURL) {
        setError('Couldn\'t upload the image.')
      }
      
      await response.user.updateProfile({ displayName: username, photoURL: imgURL});

      await projectFirestore.collection('users').doc(response.user.uid).set({
        online: true,
        displayName: username,
        photoURL: imgURL
      })

      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, isPending, error };
};
