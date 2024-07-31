import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { database } from "../firebase"
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setPaymentData } from "../GlobalState/features/paymentSlice"
import axios from "axios"

const PreAudioSuccess = () => {
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [dataDetails, setDataDetails] = useState(({
        cloudUrls: [],

        fileNames: [],
        fileDurations: [],
        amount: 0,

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
                const userRef = ref(database, `users/${user.uid}/transcript-payment-preAudio`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData)


                    if (userData) {

                        setSessionId(userData.transcriptionsSessionId || '');
                        setDataDetails({

                            cloudUrls: userData.dataDetails.cloudUrls,
                            amount: userData.dataDetails.amount,
                            fileNames: userData.dataDetails.fileNames,
                            fileDurations: userData.dataDetails.fileDurations,


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
                    const userRef = ref(database, `users/${user.uid}/transcript-payment-preAudio`);
                    update(userRef, {
                        transcriptionsSessionId: '',

                        dataDetails: {

                            cloudUrls: dataDetails.cloudUrls,
                            amount: dataDetails.amount,
                            fileNames: dataDetails.fileNames,
                            fileDurations: dataDetails.fileDurations,
                            status: "paid"
                        }
                    });
                    setDataDetails({

                        cloudUrls: dataDetails.cloudUrls,
                        fileNames: dataDetails.fileNames,
                        fileDurations: dataDetails.fileDurations,


                    })
                    toast.success("Purchase Completed")
                    setIsOk(true)
                }



            }



            handlePaymentSuccess()
        }

    }, [trigger, sessionId])



    console.log("data in preaduio success that will go to the pre audio transcriptions page:", dataDetails.cloudUrls, dataDetails.fileDurations, dataDetails.amount, dataDetails.fileNames)



    const handleContinueTranscription = () => {

        if (isOk) {

            navigate("/pre-audio-transcriptions", { state: { paidCloudUrl: dataDetails.cloudUrls, paidFilename: dataDetails.fileNames, paidFileDuration: dataDetails.fileDurations } });



        }
    };



    return (
        <div className='flex w-full min-h-screen items-center justify-center bg-bg-color flex-col'>
            <p className='text-white text-center font-bold  text-xl md:text-3xl font-poppins'>Thank you for your purchase!</p>
            <button
                onClick={handleContinueTranscription}
                className={`min-w[556px] text-center  hover:bg-purple-400-400 uppercase cursor-pointer bg-bg-purple-2  text-white text-xl my-16 px-3 py-3 rounded ${!isOk ? 'pointer-events-none cursor-not-allowed bg-gray-400' : ''
                    }`}
            >
                Continue Transcriptions
            </button>
        </div>
    )
}

export default PreAudioSuccess
