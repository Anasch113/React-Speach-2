import React, { useState, useEffect } from 'react'
import UploadSection from './UploadSection'
import TranscriptionsSection from './TranscriptionsSection'
import { useUserAuth } from '@/context/UserAuthContext'
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'
import toast from 'react-hot-toast'
import Spinner from '../PreAudio/Spinner'


const MainLayout = ({
    activeSection,
    setActiveSection,
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
    const [summaryName, setSummaryName] = useState("")
    const [selectedValue, setSelectedValue] = useState('');



    const { user, cloudUrls, fileContent } = useUserAuth()

    // uploading section code 
    console.log("file contenr of text file:", fileContent)


    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })
    console.log("dbdata:", dbdata)


    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };



    useEffect(() => {
        console.log("useEffect running on page load");
    }, []);
    // function to handle the summary deposition
    const handleSummaryDeposition = async () => {

        if (summaryName === "" || selectedValue === '' || fileContent === "") {
            toast("Please provide all the details first!")

            return
        }

        toast.success("Deposition started")
        setProcessing(true)
        setActiveSection("transcriptions")
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


            toast.success("Audio Transcriptions Completed")

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
            console.log("dataaaaaaaaaaaa", data.summaryDeposition.data)





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
    console.log(depositionType)



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

                    if (res.data.length > 0) {
                        setActiveSection("transcriptions")
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
                        onClick={() => setActiveSection('upload')}
                    >
                        Upload Files
                    </li>
                    <li
                        className={`cursor-pointer hover:text-text-gray-light pb-2 ${activeSection === 'transcriptions' ? 'border-b-2 border-purple-500' : ''
                            }`}
                        onClick={() => setActiveSection('transcriptions')}
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
