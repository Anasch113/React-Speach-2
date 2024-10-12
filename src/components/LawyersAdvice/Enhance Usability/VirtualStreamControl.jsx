import { Button } from '@/components/ui/button'
import React from 'react'
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useLiveTranscript } from '@/GlobalState/customHooks/useLiveTranscript';
const VirtualStreamControl = ({
  
  formatTime
}) => {

  const dispatch = useDispatch();

  const { isVtPaused, isVtRecording, vtRemainingTime, botId, } = useSelector((state) => state.liveTranscript.virtualTranscript)

  const { pauseVirtualTranscriptions, resumeVirtualTranscriptions, stopVirtualTranscriptions } = useLiveTranscript();


  return (
    <div className='w-full flex gap-2'>
      {
        isVtPaused && isVtRecording && <Button onClick={resumeVirtualTranscriptions} className="mx-2" variant={"customGreen"}>Resume Recording <FaPlay className='mx-2' /></Button>
      }

      {
        !isVtPaused && isVtRecording && <Button onClick={pauseVirtualTranscriptions} className="mx-2" variant={"customBlue"}>Pause Recording  <FaPause className='mx-2' /></Button>
      }

      {/* {vtRemainingTime > 0 && (
        <div className="font-semibold gap-2 font-poppins text-white-500 flex items-center">
          <MdOutlineTimer size={20} /> <p>{formatTime(vtRemainingTime)}</p>
        </div>
      )} */}
    </div>
  )
}

export default VirtualStreamControl
