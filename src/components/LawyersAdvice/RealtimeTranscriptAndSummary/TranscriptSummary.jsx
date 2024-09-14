import { Button } from '@/components/ui/button'
import React from 'react'
import { MdContentCopy } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import EditModal from '@/components/PreAudio/EditModal';

const TranscriptSummary = ({
    transcript,
    speakerLabelsText,
    showSpeakerLabels,
    transcriptions,
    wordsIndex,
    setTranscriptions,
    isEdit,
    sentimentAnalysis,
    isTranscriptionsReady



}) => {
    const [showCopied, setShowCopied] = useState(false);
    const pRefLarge = useRef(null);

    const [selectedText, setSelectedText] = useState("");
    const [updatedText, setUpdatedText] = useState("");
    const [showModal, setShowModal] = useState(false);




    // for large window
    useEffect(() => {
        if (pRefLarge.current) {

            pRefLarge.current.scrollTop = pRefLarge.current.scrollHeight;
        }
    }, [transcript])

    const copyText = () => {
        const contentToCopy = pRefLarge.current.innerText;

        navigator.clipboard.writeText(contentToCopy);
        setShowCopied(true);

    };



    const handleTextClick = (text, index) => {

        setSelectedText({ text, index });
        setShowModal(true);
    };

    const handleUpdateText = async (updatedText, index) => {

        const updatedSentiments = [...transcriptions.sentiment_analysis_results]; // Copy the utterances array

        updatedSentiments[index].text = updatedText;
        setTranscriptions({ ...transcriptions, sentiment_analysis_results: updatedSentiments });


        toast.success("Text Updated Successfully")


        // Update the state with the new utterances array
        setShowModal(false); // Close the modal
        setUpdatedText(updatedText); // Set the updated text
    };




    const handleModalClose = () => {
        setShowModal(false);
    };




console.log("sentimentAnalysis", sentimentAnalysis)

    return (


        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>
            <h1 className='md:text-3xl text-xl font-semibold'>Transcript</h1>

            <div className={`border rounded-md w-full max-[768px]:text-sm p-2 min-h-[250px] max-h-[250px] ${showSpeakerLabels ? 'overflow-y-auto' : 'overflow-y-auto'} `}>

                <div ref={pRefLarge}
                    style={{
                        height: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }} >

                    {/* {
                        !showSpeakerLabels && transcript.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                            </span>
                        ))
                    } */}

                    {

                        isTranscriptionsReady ? transcriptions.sentiment_analysis_results.map((sentiment, i) => {
                            // Find the utterance that corresponds to the current sentiment
                            const utterance = transcriptions.utterances.find(u =>
                                u.start <= sentiment.start && u.end >= sentiment.end
                            );

                            // Render the sentiment along with the speaker label if found
                            return (
                                <div className="w-full py-2 h-full" key={i}>

                                    <span className="flex gap-2">
                                        {utterance && <p className='font-lg font-bold'>{`Speaker ${utterance.speaker} :`}</p>}
                                        <p
                                            style={{ color: i === wordsIndex ? '#f1b900' : 'white' }}
                                            className={`${isEdit ? "hover:text-blue-500 hover:cursor-pointer" : ""}`}
                                            onClick={() => isEdit && handleTextClick(sentiment.text, i)}
                                        >
                                            {sentiment.text}
                                        </p>

                                    </span>
                                </div>
                            );
                        }) : transcript.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                            </span>
                        ))


                    }

                </div>


            </div>

            <Button onClick={copyText} variant={"outline"}> {!showCopied ? "Copy Text  " : "Copied"} <MdContentCopy className='mx-2' /> </Button>


            {showModal && (
                <EditModal
                    selectedText={selectedText}
                    onClose={handleModalClose}
                    onUpdateText={handleUpdateText}
                    setShowModal={setShowModal}
                />
            )}

        </div>
    )
}

export default TranscriptSummary
