import { Button } from '@/components/ui/button'
import React from 'react'
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
const InPersonStreamControl = ({
    isPaused,
    resumeTranscriptions,
    isRecording,
    pauseTranscriptions,
    remainingTime,
    formatTime,
}) => {
    return (
        <div className='w-full flex gap-2'>
            {
                isPaused && isRecording && <Button onClick={resumeTranscriptions} className="mx-2" variant={"customGreen"}>Resume Recording <FaPlay className='mx-2' /></Button>
            }

            {
                !isPaused && isRecording && <Button onClick={pauseTranscriptions} className="mx-2" variant={"customBlue"}>Pause Recording  <FaPause className='mx-2' /></Button>
            }

            {remainingTime > 0 && (
                <div className="font-semibold gap-2 font-poppins text-white-500 flex items-center">
                    <MdOutlineTimer size={20} /> <p>{formatTime(remainingTime)}</p>
                </div>
            )}
        </div>
    )
}

export default InPersonStreamControl
