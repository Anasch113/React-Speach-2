import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { database } from "../../firebase"
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";

import axios from "axios"

const CreditSuccess = () => {
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [dataDetails, setDataDetails] = useState(({

        total: 0,
        userBalance: 0,
        balance: 0,
        method: ""
    }));
    const [trigger, setTrigger] = useState(false);

    const [isOk, setIsOk] = useState(false);
    const { user } = useUserAuth();


    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {

            try {
                setUserId(user.uid);
                const userRef = ref(database, `users/${user.uid}/credit-payment`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData)


                    if (userData) {

                        setSessionId(userData.transcriptionsSessionId || '');
                        setDataDetails({


                            total: userData.total,
                            userBalance: userData.userBalance,

                            method: userData.method
                        })
                        setTrigger(true)
                        console.log("sessionId in success", userData.transcriptionsSessionId)


                    }
                    return
                });
            } catch (error) {
                console.log("Error while fething details in transcription payment success page", error)
            }

        }



    }, [user]);




    useEffect(() => {



        if (sessionId && trigger) {


            const handlePaymentSuccess = async () => {

                console.log("sessionId that will go to the server to vaerify the payment completion", sessionId)

                const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/retrieve`, { sessionId: sessionId });
                console.log("response from the payment recheck endpoint", response.data)
                const data = response.data


                if (data.message === "Payment successful") {
                    const userRef = ref(database, `users/${user.uid}/credit-payment`);
                    update(userRef, {

                        transcriptionsSessionId: '',
                        balance: dataDetails.userBalance + dataDetails.total,
                        method: dataDetails.method,
                        status: "paid"

                    });

                    toast.success("Purchase Completed")
                    setIsOk(true)
                }



            }



            handlePaymentSuccess()
        }

    }, [trigger, sessionId])



    console.log("cloud url in success page", dataDetails.cloudUrl)



    const handleContinueTranscription = () => {

        if (isOk) {
            navigate("/user-payment-info",);

        }
    };



    return (
        <div className='flex w-full min-h-screen items-center justify-center bg-bg-color flex-col'>
            <p className='text-white text-center font-bold  text-xl md:text-3xl font-poppins'>Purchase Completed! Credit has been added in your account</p>
            <button
                onClick={handleContinueTranscription}
                className={`min-w[556px] text-center  hover:bg-purple-400-400 uppercase cursor-pointer bg-bg-purple-2  text-white text-xl my-16 px-3 py-3 rounded ${!isOk ? 'pointer-events-none cursor-not-allowed bg-gray-400' : ''
                    }`}
            >
                Check Credit
            </button>
        </div>
    )
}

export default CreditSuccess
