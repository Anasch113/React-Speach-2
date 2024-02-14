import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,


} from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { database } from "../firebase";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});


  async function logIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);


    // Check if the user's email is verified
    if (userCredential.user.emailVerified === false) {
      console.log("user credentials", userCredential.user.emailVerified)
      console.log("Please verify your email before logging in");
      setUser(null)
      return null;

    }
    
    console.log("userCredentials in context", userCredential)
    return userCredential;
  }


  const signUp = async (email, password) => {


    // Create the user without signing in
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    const userData = userCredential.user;
    console.log("userData: ", userData);

    if (userData.emailVerified === false) {

      await sendEmailVerification(userData);
      console.log("Verify your email in order to signup")
      setUser(null);
    }
    await createUserInDatabase(userData.uid, { email: userData.email });
    

    return userCredential;


  };

  const createUserInDatabase = async (userId, userData) => {
    try {
     
      const userRef = ref(database, `users/${userId}`);
      await set(userRef, userData);
      console.log("User data created in the Realtime Database");
    } catch (error) {
      console.error("Error creating user data in the Realtime Database:", error.message);
      throw error;
    }
  };

  function logOut() {
    return signOut(auth)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {


      setUser(currentuser);


      console.log("user in useEffect", currentuser)




    });

    return () => {
      unsubscribe();
    };
  }, []);




  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, }}

    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}