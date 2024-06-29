import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { database } from "../firebase"
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setPaymentData } from "../GlobalState/features/paymentSlice"
import axios from "axios"

const TranscriptSuccess = () => {
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [dataDetails, setDataDetails] = useState(({
        cloudUrl: "",
        transcriptUrl: "",
        filename: "",
        fileDuration: 0,
        amount: 0,
        transcriptFileName: ""
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
                const userRef = ref(database, `users/${user.uid}/transcript-payment`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData)


                    if (userData) {

                        setSessionId(userData.transcriptionsSessionId || '');
                        setDataDetails({

                            cloudUrl: userData.dataDetails.cloudUrl,
                            transcriptUrl:  userData.dataDetails.transcriptUrl ? userData.dataDetails.transcriptUrl : "",
                            amount: userData.dataDetails.amount,
                            filename: userData.dataDetails.filename,
                            fileDuration: userData.dataDetails.fileDuration, 
                            transcriptFileName : userData.dataDetails.transcriptFileName ? userData.dataDetails.transcriptFileName : "",

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
                    const userRef = ref(database, `users/${user.uid}/transcript-payment`);
                    update(userRef, {
                        transcriptionsSessionId: '',
                        dataDetails: {
                            fileUrl: dataDetails.cloudUrl,
                            transcriptUrl: dataDetails.transcriptUrl && dataDetails.transcriptUrl,
                            transcriptFileName: dataDetails.transcriptFileName && dataDetails.transcriptFileName,
                            amount: dataDetails.amount,
                            filename: dataDetails.filename,
                            fileDuration: dataDetails.fileDuration,
                        
                            status: "paid"
                        }
                    });
                    setDataDetails({

                        cloudUrl: dataDetails.cloudUrl,
                        filename: dataDetails.filename,
                        fileDuration: dataDetails.fileDuration,
                        transcriptUrl: dataDetails.transcriptUrl && dataDetails.transcriptUrl,
                        transcriptFileName: dataDetails.transcriptFileName && dataDetails.transcriptFileName

                    })
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

           if(dataDetails.transcriptUrl === "noUrl"){

            navigate("/pre-audio-transcriptions", { state: { paidCloudUrl: dataDetails.cloudUrl, paidFilename: dataDetails.filename, paidFileDuration: dataDetails.fileDuration} });

           } 
           else{
            navigate("/resyncingAi", { state: { paidCloudUrl: dataDetails.cloudUrl, paidFilename: dataDetails.filename, paidFileDuration: dataDetails.fileDuration, transcriptUrl: dataDetails.transcriptUrl && dataDetails.transcriptUrl, transcriptFileName: dataDetails.transcriptFileName && dataDetails.transcriptFileName } });
           }
           

        }
    };



    return (
        <div className='flex w-full min-h-screen items-center justify-center bg-white flex-col'>
            <p className='text-text-blue text-center font-bold  text-xl md:text-3xl font-poppins'>Thank you for your purchase!</p>
            <button
                onClick={handleContinueTranscription}
                className={`min-w[556px] text-center  hover:bg-blue-400 uppercase cursor-pointer bg-blue-500  text-white text-xl my-16 px-3 py-3 rounded ${!isOk ? 'pointer-events-none cursor-not-allowed bg-gray-400' : ''
                    }`}
            >
                Continue Transcriptions
            </button>
        </div>
    )
}

export default TranscriptSuccess
