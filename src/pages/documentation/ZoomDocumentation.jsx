import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ZoomDocumentation = () => {
    const navigate = useNavigate();
    const removeSteps = [
        {
            title: 'Step 1',
            description: 'Login to your Zoom Account and navigate to the Zoom App Marketplace.',
        },
        {
            title: 'Step 2',
            description: 'Click Manage >> Added Apps or search for the "Captify" app.',
        },
        {
            title: 'Step 3',
            description: 'Click the "Captify" app',
        },
        {
            title: 'Step 4',
            description: 'Click Remove.',
        }
    ]
    const addSteps = [
        {
            title: 'Step 1',
            description: 'Login to your Captify Account and on dashbaord sidebar, under Corperate & Government section , click on "AI Live Captioning" option.',
        },
        {
            title: 'Step 2',
            description: 'Click Virtual Transcript.',
        },
        {
            title: 'Step 3',
            description: 'Click Connect Zoom',
        },
        {
            title: 'Step 4',
            description: 'An Zoom Authorization page will open, Mark the permissions box',
        },
        {
            title: 'Step 5',
            description: 'Click on Allow button',
        },
        {
            title: 'Step 6',
            description: 'Your Zoom account is now connected with Captify. You can now paste the link of your Zoom Meeting to continue.',
        }
    ]
    const usageSteps = [
        {
            title: 'Step 1',
            description: 'Paste your Zoom Meeting Link in the "Enter meeting url" field. ',
        },
        {
            title: 'Step 2',
            description: 'Click on "Add Bot to Meeting" button. Your bot will join the meeting now and you will see the Virtual Transcription page.',
        },
        {
            title: 'Step 3',
            description: 'Wait a little bit for popup to show on screen which will ask recordings permission for Bot. Click on Approve ',
        },
        {
            title: 'Step 4',
            description: 'Virtual Transcript is started now. You can continue your meeting and can see your realtime transcriptions on the captify currently opened virtual transcription page',
        },
        {
            title: 'Step 5',
            description: 'You can stop it from Zoom meeting and also remove Bot from Captify by clicking on the stop icon on the transcription page.',
        }
        
    ]

    return (
        <div className='w-full min-h-screen p-10 '>

           

            <div className='flex flex-col ml-5 text-purple-300   p-2 mb-10 gap-4'>
            <h1 className='text-3xl font-sans font-bold text-purple-300  '>Disclaimer: This documentation is related to the virtual transcript feature that is currently not available publicly. </h1>
                <h1 className='text-xl font-sans   '>Captify virtual transcript feature is not released yet publicly. This feature is completed but upcomming so users are not able to use it currently. With captify virtual transctipt feature, users will be able to records their Zoom meetings in real time by sending our Captify- Copilot (Bot) to thier Zoom Meetings. Our Bot will join the meeting and then transcribe Zoom meetings and users will be able to see the realtime transcription of their ongoing meetings on Captify Virtual Transcription page. Users can also perform many functions like controling the stream, editing transcript, speaker lables and full transcript at the end of meeting.</h1>
                <p>Before using the virtual transcript users must have to connect their Zoom accounts with Captify with the help of Zoom Integration. You can find the guide below for Zoom Integration with Captify:</p>

               
            </div>


            <h1 className='text-3xl font-sans font-bold my-5'>User Guide for how to use the Virtual Trancript Feature of Captify</h1>

            <div className='flex flex-col ml-5 my-5 border p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>First of All, You have to connect your Zoom Account with Captify. For this, read the following steps:</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        addSteps.map((data, i) => (
                            <span className='flex gap-2' key={i}>
                                <p className='font-semibold'>{data.title}:</p>
                                <p>{data.description}</p>
                            </span>
                        ))
                    }
                    <a href='https://www.loom.com/share/a9beba14fb054030942b3ea904660fde?sid=e40b1a9c-8810-4d6d-99e1-ceb1bdeb197c' target='_main' className='underline my-4'>Loom explanation for Zoom Authorization </a>
                </div>
            </div>
            <div className='flex flex-col ml-5 my-5 border p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>After connecting Zoom Account, Read the following steps to how to use Virtual Transcript Feature:</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        usageSteps.map((data, i) => (
                            <span className='flex gap-2' key={i}>
                                <p className='font-semibold'>{data.title}:</p>
                                <p>{data.description}</p>
                            </span>
                        ))
                    }
                </div>
                <a href='https://www.loom.com/share/e7246b34dd964aa4a3ae66205ea784ed?sid=8c59c4fb-abbb-4e35-aeac-c12d540f2ce1' target='_main' className='underline my-4'>Loom explanation for Virtual Transcript Feature Usage</a>
            </div>
            <div className='flex flex-col ml-5 my-5 border p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>How to remove the app from zoom account?</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        removeSteps.map((data, i) => (
                            <span className='flex gap-2' key={i}>
                                <p className='font-semibold'>{data.title}:</p>
                                <p>{data.description}</p>
                            </span>
                        ))
                    }
                </div>
            </div>

            <div className='flex gap-10'>
                <span className='p-5 border md:w-2/5 flex flex-col gap-5'>
                    <p className=''>Still find issues? Please contact to our support </p>
                    <Button className="md:w-2/5" variant={"customPurple"} onClick={() => {
                        navigate("/contact-us")
                    }} >Contact Us</Button>
                </span>
                <span className='p-5 border md:w-2/5 flex flex-col gap-5'>
                    <p className=''>Complete reading? </p>
                    <Button className="md:w-2/5" variant={"customPurple"} onClick={() => {
                        navigate("/virtual-transcript")
                    }} >Go Back</Button>
                </span>
            </div>


        </div>
    )
}

export default ZoomDocumentation
