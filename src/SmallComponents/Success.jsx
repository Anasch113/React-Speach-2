import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, } from "firebase/database"
import toast from "react-hot-toast"

const Success = () => {
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isOk, setIsOk] = useState(false);
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
          setTrigger(true)
          console.log("sessionId in success", userData.subscription.sessionId)
          // Make sure to handle potential null values
        }
      });
    }

  }, [user]);


  useEffect(() => {

    if (sessionId && trigger) {


      const handlePaymentSuccess = async () => {

        await fetch(`${import.meta.env.VITE_HOST_URL}/payment-success`, {
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
            toast.success("Purchase Completed")
            setIsOk(true)
            console.log(data.message);

          })
          .catch(e => {
            console.log(e.error);
          });

      }



      handlePaymentSuccess()
    }

  }, [trigger, sessionId])






  return (
    <div className='flex w-full min-h-screen items-center justify-center bg-white flex-col'>
      <p className='text-text-blue text-center font-bold  text-xl md:text-3xl font-poppins'>Congratulations! You have subscribed the Captify Pass</p>
      <a
        href='/pricing'
        className={`w-56 text-center  hover:bg-[#69c2bf] uppercase cursor-pointer bg-[#009C96]  text-white text-xl my-16 px-3 py-3 rounded ${!isOk ? 'pointer-events-none cursor-not-allowed bg-gray-400' : ''
          }`}
      >
       Go to Pricing
      </a>
    </div>
  )
}

export default Success
