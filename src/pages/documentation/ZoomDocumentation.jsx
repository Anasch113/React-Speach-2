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
            description: 'Login to your Captify Account and on dashbaord click on the live transcript option in sidebar.',
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
        }
    ]

    return (
        <div className='w-full min-h-screen p-10 '>

            <h1 className='text-3xl font-sans font-bold my-5'>User Guide to use / add / remove the app from Zoom account</h1>

            <div className='flex flex-col ml-5 my-5 border p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>How to add the Captify with Zoom Account?</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        addSteps.map((data, i) => (
                            <span className='flex gap-2' key={i}>
                                <p className='font-semibold'>{data.title}:</p>
                                <p>{data.description}</p>
                            </span>
                        ))
                    }
                </div>
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
