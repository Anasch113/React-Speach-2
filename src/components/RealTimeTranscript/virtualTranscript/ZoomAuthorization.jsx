import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom"
import { useLiveTranscript } from "../../../GlobalState/customHooks/useLiveTranscript"
import {
    setZoomAccessToken,
    setIsToken
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
import { ref, onValue, update } from "firebase/database"
import toast from 'react-hot-toast';
import { database } from "../../../firebase"
import { useUserAuth } from '@/context/UserAuthContext';
const ZoomAuthorization = ({
    buttonName,
    handleZoomAuthorization,
    navigateUrl


}) => {


    const [localStorageData, setLocalStorageData] = useState("")

    const dispatch = useDispatch();

    const { zoomAccessToken } = useSelector((state) => state.liveTranscript.virtualTranscript)
    const navigate = useNavigate()
    const location = useLocation()
    console.log("navogate url as prop:", navigateUrl)


    const { user } = useUserAuth();

    useEffect(() => {
        if (navigateUrl === "virtual-transcript") {

            localStorage.setItem('navigateUrl', navigateUrl);
        }
        else if (navigateUrl === "case-note") {

            localStorage.setItem('navigateUrl', navigateUrl);
        }

        // Optional: If you want to perform additional actions based on the URL
        // You can access the URL stored in localStorage at any time like this:
        const storedUrl = localStorage.getItem('navigateUrl');
        setLocalStorageData(storedUrl)
        console.log("Stored URL in localStorage:", storedUrl);

    }, [navigateUrl]);

    console.log("stored urllll", localStorageData)




    // useEffect to get the access token after zoom authorization 

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        console.log("token", token)

        if (token) {
            // Store the token in localStorage or any state management system
            localStorage.setItem('zoomAccessToken', token);
            dispatch(setZoomAccessToken(token))
            dispatch(setIsToken(true))
            // Redirect to the actual dashboard after storing the token
            toast.success("Zoom Connected")
            const storedUrl = localStorage.getItem('navigateUrl');
            console.log("Stored URL in localStorage after zoom authorization:", storedUrl);

            const userRef = ref(database, `users/${user.uid}/zoom-oAuth`);
            update(userRef, {
                feature: storedUrl,
                token: token


            });

            if (storedUrl === "virtual-transcript") {
                navigate(`/virtual-transcript?token=${token}`)
            }
            if (storedUrl === "case-note") {
                navigate(`/note-case?token=${token}`)
            }
        }

    }, [location, navigate]);



    return (
        <>
            <Dialog>
                <DialogTrigger asChild>

                    <Button className="mx-2 w-52" variant={"lightPurpleMeetingBtn"}>{buttonName} </Button>

                </DialogTrigger>
                <DialogContent className="md:max-w-[600px]  md:min-h-[400px] max-w-[300px] max-h-[500px] overflow-y-auto">
                    <DialogHeader >
                        <DialogTitle className="mb-8">Virtual Transcript Meeting</DialogTitle>
                        <DialogDescription>
                            <div className="my-5">
                                Your Case Note Virtual Transcript is just few steps far. Complete these steps to record your virtaul meeting with Captify - Copilot
                            </div>
                            <div className='flex flex-col gap-5 w-full  h-full p-2'>


                                <button

                                    style={{
                                        padding: "15px 5px",
                                        fontSize: "1em",
                                        cursor: "pointer",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                    }}
                                    className={` w-52 ${zoomAccessToken === "" ? "bg-bg-purple-2" : "bg-green-600"}`}
                                    onClick={handleZoomAuthorization}
                                >
                                    {zoomAccessToken === "" ? "Connect Zoom" : "Zoom Connected"}
                                </button>

                                

                                <button onClick={() => {
                                    navigate("/user-guide-to-add/remove-app-from-zoom-account")
                                }} className='underline text-gray-300 hover:text-gray-300/50'> You can also visit our documentation here</button>
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

export default ZoomAuthorization
