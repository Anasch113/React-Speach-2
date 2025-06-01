import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { database } from "../../firebase"
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database"
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast"

import axios from "axios"


const CaseNoteSuccess = () => {
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [dataDetails, setDataDetails] = useState(({
        minutes: 0,
        price: 0,
        method: "",
        language: "",
        xeroInvoiceID: ""

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
                const userRef = ref(database, `users/${user.uid}/casenote`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData)


                    if (userData) {

                        setSessionId(userData.transcriptionsSessionId || '');
                        setDataDetails({

                            price: userData.price,
                            minutes: userData.minutes,
                            method: userData.method,
                            language: userData.language,
                            xeroInvoiceID: userData.xeroInvoiceID


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

                const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/retrieve`, { sessionId: sessionId , xeroInvoiceID: dataDetails.xeroInvoiceID, total: dataDetails.price});
                console.log("response from the payment recheck endpoint", response.data)
                const data = response.data


                if (data.message === "Payment successful") {
                    const userRef = ref(database, `users/${user.uid}/casenote`);
                    update(userRef, {
                        transcriptionsSessionId: '',

                        price: dataDetails.price,
                        minutes: dataDetails.minutes,
                        method: dataDetails.method,
                        language: dataDetails.language,
                        status: "paid",
                        xeroInvoiceID: dataDetails.xeroInvoiceID

                    });
                    setDataDetails({
                        price: dataDetails.price,
                        minutes: dataDetails.minutes,
                        method: dataDetails.method,
                        language: dataDetails.language,
                        xeroInvoiceID: dataDetails.xeroInvoiceID



                    })
                    toast.success("Purchase Completed")

                    setIsOk(true)
                }

            }



            handlePaymentSuccess()
        }

    }, [trigger, sessionId])







    const handleContinueTranscription = () => {

        if (isOk) {

            navigate("/note-case", { state: { isPurchase: "completed", minutes: dataDetails.minutes, language: dataDetails.language } });




        }
    };



    return (
        <div className='flex w-full min-h-screen items-center justify-center bg-bg-color flex-col'>
            <p className='text-white text-center font-bold  text-xl md:text-3xl font-poppins'>Thank you for your purchase!</p>
            <button
                onClick={handleContinueTranscription}
                className={`min-w[556px] text-center  hover:bg-purple-400 uppercase cursor-pointer bg-bg-purple-2  text-white text-xl my-16 px-3 py-3 rounded ${!isOk ? 'pointer-events-none cursor-not-allowed bg-gray-400' : ''
                    }`}
            >
                CLICK TO CONTINUE
            </button>
        </div>
    )
}

export default CaseNoteSuccess
