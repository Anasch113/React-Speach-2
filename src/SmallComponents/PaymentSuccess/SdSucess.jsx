import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { database } from "../../firebase"
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";

import axios from "axios"

const SdSucess = () => {
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [dataDetails, setDataDetails] = useState(({
        fileContent: "",
        depositionType: "",
        summaryName: "",
        selectedValue: "",
        amount: 0,
        fileNames: [],
        xeroInvoiceID: ''

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
                const userRef = ref(database, `users/${user.uid}/transcript-payment-sd`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData)


                    if (userData) {

                        setSessionId(userData.transcriptionsSessionId || '');
                        setDataDetails({

                            summaryName: userData.dataDetails.summaryName,
                            depositionType: userData.dataDetails.depositionType,
                            selectedValue: userData.dataDetails.selectedValue,
                            fileContent: userData.dataDetails.fileContent,
                            fileNames: userData.dataDetails.fileNames,
                            xeroInvoiceID: userData.dataDetails.xeroInvoiceID,



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

                console.log("sessionId that will go to the server to verify the payment completion", sessionId)

                const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/retrieve`, { sessionId: sessionId, xeroInvoiceID: dataDetails.xeroInvoiceID, total: dataDetails.amount });
                console.log("response from the payment recheck endpoint", response.data)
                const data = response.data


                if (data.message === "Payment successful") {
                    const userRef = ref(database, `users/${user.uid}/transcript-payment-sd`);
                    update(userRef, {
                        transcriptionsSessionId: '',

                        dataDetails: {

                            summaryName: dataDetails.summaryName,
                            depositionType: dataDetails.depositionType,
                            selectedValue: dataDetails.selectedValue,
                            fileContent: dataDetails.fileContent,
                            fileNames: dataDetails.fileNames,
                            status: "paid",
                            xeroInvoiceID: dataDetails.xeroInvoiceID
                        
                        }
                    });

                    setDataDetails({

                        summaryName: dataDetails.summaryName,
                        depositionType: dataDetails.depositionType,
                        selectedValue: dataDetails.selectedValue,
                        fileContent: dataDetails.fileContent,
                        fileNames: dataDetails.fileNames,
                        xeroInvoiceID: dataDetails.xeroInvoiceID


                    })
                    toast.success("Purchase Completed")
                    setIsOk(true)
                }



            }

            handlePaymentSuccess()
        }

    }, [trigger, sessionId])



    console.log("data in sd success that will go to the pre summary deposition page:", dataDetails.summaryName, dataDetails.depositionType, dataDetails.selectedValue, dataDetails.fileContent)



    const handleContinueTranscription = () => {

        if (isOk) {

            navigate("/summarization-deposition", { state: { paidFileContent: dataDetails.fileContent, paidSummaryName: dataDetails.summaryName, paidDepostionType: dataDetails.depositionType, paidDeponant: dataDetails.selectedValue, paidFileNames: dataDetails.fileNames } });



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
                CLICK TO CONTINUE
            </button>
        </div>
    )
}

export default SdSucess
