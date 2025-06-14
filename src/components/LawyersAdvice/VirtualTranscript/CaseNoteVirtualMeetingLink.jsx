import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom"
import { useLiveTranscript } from "../../../GlobalState/customHooks/useLiveTranscript"
import {
    setTranscriptType,
} from "../../../GlobalState/features/liveTranscriptUISlice";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
const CaseNoteVirtualMeetingLink = ({
    isOpen,
    setIsOpen,
    setIsMeetingStart
}) => {


    const [meetingUrl, setMeetingUrl] = useState("")


    const dispatch = useDispatch();

    const { liveTranscript, finalTranscript, transcriptType, meetingStatus, meetingError, zoomAccessToken, isToken } = useSelector((state) => state.liveTranscript.virtualTranscript)



    const sendMeetingUrl = async () => {
        // basic url validation
        try {
            new URL(meetingUrl);
        } catch (error) {
            toast.error("Please enter a valid Zoom meeting URL.");
            return;
        }

        try {

            await axios.post(`${import.meta.env.VITE_HOST_URL}/virtual-transcript/invite_bot`, {
                meetingUrl: meetingUrl,
            });
            setIsMeetingStart(true)
            dispatch(setTranscriptType("start"));
            toast.success("Bot joining the meeting")
        } catch (error) {

            console.log("error while bot invite", error)
        }
    };



    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>

                    {/* <Button className="mx-2" variant={"lightPurpleMeetingBtn"}>Virtual Meeting <FaPlay className='mx-2' /></Button> */}

                </DialogTrigger>
                <DialogContent className="md:max-w-[600px]  md:min-h-[400px] max-w-[300px]  ">
                    <DialogHeader >
                        <DialogTitle className="mb-8">Virtual Transcript Meeting</DialogTitle>
                        <DialogDescription>
                            <div className="my-5">
                                Your Case Note Virtual Transcript is just few steps away. Complete these steps to record your virtaul meeting with Captify - Copilot
                            </div>
                            {
                                zoomAccessToken && <span className='flex gap-3 items-center my-5 p-2'>
                                    <p className='font-poppins text-white'>Zoom Connected</p>
                                    <img className='w-5 h-5' src="/greentick.png" alt="icon" />
                                </span>
                            }


                            <div className='flex flex-col gap-5 w-full  h-full p-2'>

                                {
                                    zoomAccessToken === "zoom-connected" &&

                                    <div className='flex gap-5 w-full '>
                                        <input
                                            type="text"
                                            value={meetingUrl}
                                            onChange={(e) => setMeetingUrl(e.target.value)}
                                            style={{

                                                padding: "15px 5px",
                                                fontSize: "1em",
                                                borderRadius: "4px",
                                                border: "1px solid #ccc",
                                            }}
                                            placeholder="Enter meeting URL"
                                            className='w-2/4 text-black'
                                        />

                                        <button

                                            style={{
                                                padding: "15px 10px",
                                                fontSize: "1em",
                                                cursor: "pointer",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                            }}
                                            className='bg-bg-purple-2'
                                            onClick={sendMeetingUrl}
                                        >
                                            Add Bot to Meeting
                                        </button>
                                    </div>
                                }



                            </div>

                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter >

                        {/* <DialogClose asChild>
                            <button className='text-center px-5 py-3 w-full  h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-bg-purple mb-2 '><span className='flex items-center text-center justify-center gap-2'>
                                    <p>Direct Pay </p>
                                </span></button>

                        </DialogClose> */}


                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default CaseNoteVirtualMeetingLink
