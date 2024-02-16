import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, } from "firebase/database"


const Success = () => {
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const { user } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {


    if (user) {
      setUserId(user.uid);
      const userRef = ref(database, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        console.log(userData)


        if (userData) {
          setSessionId(userData.subscription.sessionId || '');
          console.log("sessionId in success", userData.subscription.sessionId) // Make sure to handle potential null values
        }
      });
    }

  }, [user]);



  const handlePaymentSuccess = async () => {
    await fetch("http://localhost:8000/payment-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sessionId: sessionId, firebaseId: user.uid })
    })
      .then(res => {
        if (res.ok) return res.json();
        console.log(res.json)
        return res.json().then(json => Promise.reject(json));

      })
      .then(data => {
        console.log(data.message);

      })
      .catch(e => {
        console.log(e.error);
      });
  }



  return (
    <div className='flex w-full min-h-screen items-center justify-center bg-white flex-col'>
      <h1 className='text-text-blue font-bold text-4xl font-poppins'>Congratulations! You have subscribed the Captify Pass</h1>
      <button onClick={() => handlePaymentSuccess()}
        className='w-40 uppercase bg-[#009C96] text-white text-xl my-16 px-2 py-2 rounded'
      >
        Proceed
      </button>
    </div>
  )
}

export default Success
