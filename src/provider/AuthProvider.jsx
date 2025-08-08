import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../axios/useAxiosPublic";
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      const userEmail = { email: currentUser?.email };
      if (currentUser) {
        setLoading(false);
        // const userEmai = { email: currentUser?.email };
        const { data } = await axiosPublic.post("/jwt", { userEmail });
        console.log(data);
      } else {
        const { data } = await axiosPublic.post("/logOut", { userEmail });
        console.log(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdatedPass = (password) => {
    return updatePassword(user, password);
  };

  const value = {
    createUser,
    user,
    loading,
    logOut,
    logIn,
    handleUpdatedPass,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
