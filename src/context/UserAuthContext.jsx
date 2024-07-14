import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,




} from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";
import axios from "axios"
import toast from "react-hot-toast";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userBalance, setUserBalance] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [message, setMessage] = useState("");



  async function logIn(email, password) {


    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/emails/email-verify-login`, { email });
    console.log("response from server verify login", response.data)

    if (response.data.message === "Email not verified. Verification email sent") {
      setMessage(response.data.message)

      return null
    }

    else if (response.data.message === "Email verified") {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully")
      setMessage("Verified Email")
      console.log("userCredentials in context", userCredential)

      return userCredential;
    }






  }


  const signUp = async (email, password, name) => {


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
    await createUserInDatabase(userData.uid, { email: userData.email, name: name });


    return userCredential;


  };

  // SignUp with google

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {

      const userCredentials = await signInWithPopup(auth, provider);


      const userData = userCredentials.user;

      const userRef = ref(database, `users/${userData.uid}`)

      onValue(userRef, (snapshot) => {
        const userDetails = snapshot.val();
        if (userDetails) {
          console.log("user already have account in realtime database userdetails:", userDetails)



          return
        }
        else {
          createUserInDatabase(userData.uid, { email: userData.email, name: userData.displayName });
          console.log("User signed up with Google and data stored in database.");
        }

      })





    } catch (error) {
      console.error("Error signing up with Google:", error.message);
    }

  }


  // SignUp with Facebook

  const signUpWithFaceBook = async () => {
    const provider = new FacebookAuthProvider()

    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const userData = userCredentials.user;

      await createUserInDatabase(userData.uid, { email: userData.email, name: userData.displayName });
      console.log("User signed up with facebook and data stored in database.");

    } catch (error) {
      console.error("Error signing up with facebook:", error.message);
    }

  }

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
    if (user) {

      const fetchPaymentDetails = async () => {


        try {
          const paymentRef = ref(database, `users/${user.uid}/subscription`);
          const paymentSnapshot = await get(paymentRef);

          if (paymentSnapshot.exists()) {
            const paymentData = paymentSnapshot.val();


            setPaymentInfo(paymentData)


          }
        } catch (error) {
          console.log("error while fetching payment details", error)
        }
      }

      fetchPaymentDetails();

    }
  }, [user])

  useEffect(() => {
    if (user) {

      try {

        const userRef = ref(database, `users/${user.uid}/credit-payment`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();

          console.log(userData)


          if (userData) {
            const balance = userData.balance;

            setUserBalance(balance)
            console.log("balance of user", userData.balance)
          }
          return
        });
      } catch (error) {
        console.log("Error while fething balance of user", error)
      }

    }



  }, [user]);






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
      value={{ user, signUp, logIn, logOut, paymentInfo, userBalance, signUpWithGoogle, signUpWithFaceBook, message }}

    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}