import { Button } from '@/components/ui/button'
import React from 'react'
import { MdContentCopy } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';

const TranscriptSummary = ({
    transcript
}) => {
    const [showCopied, setShowCopied] = useState(false);
    const pRefLarge = useRef(null);

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

    return (


        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>
            <h1 className='md:text-3xl text-xl font-semibold'>Transcript</h1>

            <div className='border rounded-md w-full max-[768px]:text-sm p-2 h-[150px] overflow-hidden'>

                <div ref={pRefLarge}
                    style={{
                        height: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }} >

                    {
                        transcript.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                            </span>
                        ))
                    }
                </div>


            </div>

            <Button onClick={copyText} variant={"outline"}> {!showCopied ? "Copy Text  " : "Copied"} <MdContentCopy className='mx-2' /> </Button>

        </div>
    )
}

export default TranscriptSummary
