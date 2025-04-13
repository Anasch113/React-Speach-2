import React, { useState, useEffect } from 'react'
import UploadSection from './UploadSection'
import TranscriptionsSection from './TranscriptionsSection'
import { useUserAuth } from '@/context/UserAuthContext'
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'
import toast from 'react-hot-toast'
import Spinner from '../PreAudio/Spinner'
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, update } from "firebase/database"
import { database } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveSection } from '../../GlobalState/features/UXSlice'
const MainLayout = ({

    checkSection
}) => {



    const [transcribeText, setTranscribeText] = useState("")
    const [transcriptions, setTranscriptions] = useState({})
    const [subtitle, setSubtitle] = useState("")
    const [depositionType, setDepositionType] = useState("")
    const [dbdata, setDbData] = useState([])
    const [processing, setProcessing] = useState(false)
    const [formattedTranscript, setFormattedTranscript] = useState("")
    const [reloadLoading, setReloadLoading] = useState(false)
    const [runUseEffect, setRunUseEffect] = useState(false)
    const [isPaymentDone, setIsPaymentDone] = useState(false)
    const [summaryName, setSummaryName] = useState("")
    const [selectedValue, setSelectedValue] = useState('');
    const [isStepOneDone, setIsStepOneDone] = useState(false)

    const dispatch = useDispatch();
    const { activeSection } = useSelector((state) => state.ux.summaryDeposition)

    const { user, cloudUrls, fileContent, setFileContent, userBalance, setIsPaymentInProgress, fileNames, setFileNames, cost } = useUserAuth()

    console.log("active section:", activeSection)

    // uploading section code 
    console.log("cost of deposition :", cost)


    const navigate = useNavigate();
    const location = useLocation();

    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })
    console.log("dbdata:", dbdata)


    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };


    const hanldeStepOne = (type) => {
        setIsStepOneDone(true)
        setDepositionType(type)
    }


    // >>>>>>>>>> Payment Intgeration start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const paidFileContent = location.state?.paidFileContent;
    const paidSummaryName = location.state?.paidSummaryName;
    const paidDepostionType = location.state?.paidDepostionType;
    const paidDeponant = location.state?.paidDeponant;
    const paidFileNames = location.state?.paidFileNames;


    console.log("users balance in pre audio", userBalance)


    useEffect(() => {

        if (paidFileContent) {

            setFileContent(paidFileContent)
            setDepositionType(paidDepostionType)
            setSelectedValue(paidDeponant)
            setSummaryName(paidSummaryName)
            setFileNames(paidFileNames)
            dispatch(setActiveSection("upload"))

            setIsStepOneDone(true)
            toast.success("Continue your Depsotion")

            setIsPaymentInProgress(false)

            setIsPaymentDone(true)

        }
        // Clear the state from the URL
        navigate(location.pathname, { replace: true });
    }, [paidFileContent])


    // >>>>>>>>> Additional Info code >>>>>>>>>>>>>>>>>>


    const [promoCode, setPromoCode] = useState("");

    const [currency, setCurrency] = useState('USD'); // Default to USD


    const handlePromodeCodeChange = (e) => {
        const value = e.target.value;
        setPromoCode(value)
    };


    const handleCurrencyChange = (newCurrency) => {

        setCurrency(newCurrency); // Update the selected currency
    };
    console.log("selected currency:", currency)


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    // Function to create Stripe session
    const createStripeSession = async () => {
        const userId = user.uid
        const userEmail = user.email
        const userName = user.displayName

        try {

            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/create-stripe-session-sd`, {
                userId,
                cost,
                summaryName,
                fileContent,
                depositionType,
                selectedValue,
                fileNames,
                promoCode,
                currency,
                userEmail,
                userName
            });


            return response.data;
        }

        catch (error) {
            console.error("Error creating Stripe session", error);
            return null;
        }
    };

    const handleCardPayment = async () => {

        try {

            // For direct method
            const stripeSession = await createStripeSession();

            if (stripeSession && stripeSession.url) {
                // Redirect the user to Stripe Checkout
                window.location.href = stripeSession.url;
            } else {
                alert("Failed to create Stripe session. Please try again.");
            }

        } catch (error) {
            console.log("error", error)
        }
    }



    // >>>>>>>>>> Payment Intgeration End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




    // function to handle the summary deposition
    const handleSummaryDeposition = async () => {

        if (summaryName === "" || selectedValue === '' || fileContent === "") {
            toast("Please provide all the details first!")

            return
        }

        if (cost > userBalance) {
            toast.error("Insufficient credit, Please buy more credit ")

            setProcessing(false)
            return
        }

        toast.success("Deposition started")
        setProcessing(true)
        dispatch(setActiveSection("transcriptions"))


        try {
            const generateSd = await generateSummaryDeposition(fileContent)
            setProcessing(false)


            const chunkSize = 1024 * 1024; // 1MB chunks
            const chunks = [];
            const utterancesChunks = [];
            // Split transcribe and utterances data into smaller chunks
            for (let i = 0; i < transcribe.text.length; i += chunkSize) {
                chunks.push(transcribe.text.substring(i, i + chunkSize));
            }
            for (let i = 0; i < transcribe.utterances.length; i += chunkSize) {
                utterancesChunks.push(transcribe.utterances.slice(i, i + chunkSize));
            }
            const currentIndex = cloudUrls.indexOf(url);
            // Send each chunk to the server sequentially
            // for (let i = 0; i < chunks.length; i++) {
            //     const body = {
            //         id: transcribe.id,
            //         text: chunks[i],
            //         audio_url: transcribe.audio_url,
            //         status: transcribe.status,
            //         audio_duration: transcribe.audio_duration,
            //         utterances: utterancesChunks[i],
            //         sentimentAnalysisResults: transcribe.sentiment_analysis_results.slice(i * chunkSize, (i + 1) * chunkSize),
            //         userId: user.uid,
            //         filename: fileNames[currentIndex],
            //     };
            //     await axios.post(`${import.meta.env.VITE_HOST_URL}/api/save/savePreAudio`, body, {
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     });
            // }



        } catch (error) {
            console.log("error in summary deposition", error)
        }
    }




    // function to generate the summary deposition 

    const generateSummaryDeposition = async (subtitle) => {
        try {

            const body = {

                subtitle: subtitle,
                depositionType: depositionType
            }
            // sending transcript to server for summary deposition
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/sd/generate`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = response.data





            const pageLineSaveBody = {

                userId: user.uid,
                depositionType: depositionType,
                summaryName: summaryName,
                deponant: selectedValue,
                segments: data.summaryDeposition.segments,
                timestamps: data.summaryDeposition.timestamps,
                summaries: data.summaryDeposition.summaries,

            }



            const narrativeSaveBody = {

                userId: user.uid,
                depositionType: depositionType,
                summaryName: summaryName,
                deponant: selectedValue,
                narrativeSummary: data.summaryDeposition.data

            }




            const saveResponse = await axios.post(`${import.meta.env.VITE_HOST_URL}/sd/save`, depositionType === "pageLine" ? pageLineSaveBody : narrativeSaveBody, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const message = saveResponse.data.message;
            toast.success(message)


            // Update user balance in Firebase
            const newBalance = userBalance - cost; // Assuming `cost` is the transcription cost in state
            await update(ref(database, `users/${user.uid}/credit-payment`), {
                balance: newBalance
            });


            console.log("User balance updated successfully");
            console.log("data stored in database:", saveResponse.data)
            window.location.reload()

        } catch (error) {
            console.log("error in generate summary deposition:", error)
            toast.error("Some error occurred")
        }
    }
    // console.log("depostion summary data:", data)
    // Function to extract the formatted text from transcriptions
    const extractFormatTranscriptionText = (transcriptions) => {
        if (!transcriptions || !transcriptions.sentiment_analysis_results || !transcriptions.utterances) return '';

        let text = '';

        transcriptions.sentiment_analysis_results.forEach((sentiment, i) => {
            const utterance = transcriptions.utterances.find(u =>
                u.start <= sentiment.start && u.end >= sentiment.end
            );

            // if (utterance) {
            //     text += `Speaker ${utterance.speaker}: `;
            // }

            text += `${sentiment.start} -- ${sentiment.end}`

            text += `${sentiment.text} `;
        });

        return text.trim(); // Trim any extra spaces at the end
    };


    const getSubtitleFile = async (transcriptId, format) => {
        console.log(transcriptId, format)
        const url = `https://api.assemblyai.com/v2/transcript/${transcriptId}/${format}`
        try {
            const response = await axios.get(url, {
                headers: {
                    authorization: import.meta.env.VITE_ASSEMBLYAI_KEY,
                    "Content-Type": "application/json"
                }

            })

            return response.data
        } catch (error) {
            console.log("Error in the SRT Response", error);
        }

    }
    console.log(depositionType, summaryName, selectedValue)



    useEffect(() => {

        const fetchTranscriptions = async () => {

            try {
                setReloadLoading(true)
                const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/sd/fetch`, {
                    userId: user.uid
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((res) => {

                    setDbData(res.data)

                    if (res.data.length > 0 && !paidFileContent) {
                        dispatch(setActiveSection("transcriptions"))
                    }

                }).catch((error) => {
                    console.log("error in response from database")
                })


            } catch (error) {
                console.log("error while fetching the transcriptions in transcript component")
            }
            finally {
                setReloadLoading(false); // Set loading to false after API call is completed
            }
        }

        fetchTranscriptions()

    }, [user])

    return (


        <div className='min-h-screen w-full p-5 flex flex-col gap-5'>

            <h1 className='font-poppins text-3xl font-semibold text-white  ml-10 my-5' >
                Summary Deposition
            </h1>

            <div className='ml-16 border-b pb-5'>
                <span className=' flex list-none gap-10 '>
                    <li
                        className={`cursor-pointer hover:text-text-gray-light pb-2 ${activeSection === 'upload' ? 'border-b-2 border-purple-500' : ''
                            }`}
                        onClick={() => dispatch(setActiveSection('upload'))}
                    >
                        Upload Files
                    </li>
                    <li
                        className={`cursor-pointer hover:text-text-gray-light pb-2 ${activeSection === 'transcriptions' ? 'border-b-2 border-purple-500' : ''
                            }`}
                        onClick={() => dispatch(setActiveSection('transcriptions'))}
                    >
                        Your Transcriptions
                    </li>
                </span>

            </div>


            <div className='w-full flex justify-center md:p-5 p -2'>
                {activeSection === 'upload' &&
                    <UploadSection
                        handleSummaryDeposition={handleSummaryDeposition}
                        setDepositionType={setDepositionType}
                        summaryName={summaryName}
                        setSummaryName={setSummaryName}
                        handleSelectChange={handleSelectChange}
                        selectedValue={selectedValue}
                        isPaymentDone={isPaymentDone}
                        handleCardPayment={handleCardPayment}
                        hanldeStepOne={hanldeStepOne}
                        isStepOneDone={isStepOneDone}
                        setIsStepOneDone={setIsStepOneDone}
                        promoCode={promoCode}
                        handlePromodeCodeChange={handlePromodeCodeChange}
                        handleCurrencyChange={handleCurrencyChange}




                    />}
                {activeSection === 'transcriptions' &&

                    // reloadLoading ? <Spinner/> : 


                    <TranscriptionsSection
                        processing={processing}
                        dbdata={dbdata}
                        reloadLoading={reloadLoading}
                        summaryName={summaryName}
                        depositionType={depositionType}
                        selectedValue={selectedValue}

                    />}
            </div>

        </div>


    )
}

export default MainLayout
