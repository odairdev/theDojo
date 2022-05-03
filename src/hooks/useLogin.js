import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth;

  const login = async (email, password) => {
    setIsPending(true);

    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete login, server error.");
      }

      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
