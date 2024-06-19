import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../firebase';
import { signInWithCustomToken } from "firebase/auth"
import axios from "axios"

import toast from 'react-hot-toast';
const EmailVerification = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Verifying...");
  const [userId, setUserId] = useState("");
  const [isOk, setIsOk] = useState(false);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get("uid");

    console.log("queryParams in email verification", queryParams)

    if (uid) {
      verifyEmail(uid);
      setUserId(uid)
     
    } else {
      setMessage("Invalid verification link.");
    }
  }, [location]);



  const verifyEmail = async (uid) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/emails/verify-email`, { uid });

      if (response.data.message === "Email verified successfully") {
        const token = response.data.token
        setIsOk(true)
        console.log("custom token from the server", token)

        setMessage("Email verified successfully. Redirecting to dashboard...");

        signInWithCustomToken(auth, token).then(() => {
          setTimeout(() => {
            window.location.href = "/home";
          }, 3000);

          toast.success("Signup successfully")
        }).catch((error) => {
          console.log("Erro while custom token login", error)
        })


      }

    } catch (error) {
      setMessage("Error verifying email. Please try again.");
      console.error("Error verifying email: ", error);
    }
  };



  return (


    <div className="">
      <section className=" ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">Email Verification</h1>


              <div className='flex items-center flex-col justify-center p-1 gap-3'>



                <p className='font-semibold text-lg text-gray-500 font-poppins text-center m-2'>{message}</p>
                {
                  isOk  && <img className='w-14' src="/assets/icons/check.png" alt="" />
                }


                

              </div>


            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EmailVerification
