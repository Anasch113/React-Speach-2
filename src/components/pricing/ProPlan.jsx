import React, { useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { Link } from 'react-router-dom';
const ProPlan = ({ checkout }) => {

    const { paymentInfo } = useUserAuth();

    console.log(paymentInfo)




    return (
        <div className={` ${paymentInfo.planType === "pro" ? "card" : "null"} flex flex-col px-10 justify-center bg-white w-96 min-h-400  rounded-3xl gap-10  py-10 max-[500px]:w-80`}>
            <div className='font-poppins flex flex-col gap-4 '>
                <span className='flex flex-row items-center gap-3' >

                    <img className='rounded-full p-3 bg-[#4D5EC3] w-12' src="/audio-waves.png" alt="img" />
                    <p className='text-[#4D5EC3] font-medium  font-roboto  text-3xl'>Pro</p>
                </span>


                <p className='text-gray-500 font-roboto py-5 w-56'> Better collaboration for small teams</p>


                <span className='flex flex-col  gap-5 py-2'>
                    <span className='flex items-center gap-2'>

                        <p className='font-bold text-4xl' >$10</p>
                        <span className='flex justify-center flex-col'>
                            <p>USD </p>
                            <p className='text-gray-500'>per/month </p>
                        </span>

                    </span>

                    <p className='bg-[#d8ddf9] p-1 w-2/4 text-center rounded-2xl text-[#4D5EC3] text-sm px-2'>Billed annually</p></span>


            </div>

            <div className=''>
                {
                    paymentInfo.planType === "pro" ?

                        (
                            <div className='flex flex-col gap-2'>
                                <p className='text-text-color-blue text-lg py-2'>&#10003; You have subscribed this plan</p>
                      <Link to={"/plandetails"}>  <button  className='bg-gray-500 hover:bg-gray-400 py-3 text-lg px-2 rounded-md w-48 text-white text-center'>See Plan Details</button>
                      </Link>
                        </div>
                        
                        ) :

                        ( <button onClick={() => checkout("pro")} className='font-poppins bg-[#4D5EC3]  py-3 px-3 rounded-3xl w-44 text-white hover:bg-[#5b70e7]'>
                        Get Now
                    </button>)
                }

            </div>

            <div className='flex flex-col p-2 gap-4  pt-5 '>
                <p className='font-poppins -ml-2 text-lg'>Everything in pro +</p>

                <div className='flex flex-col gap-2 text-text-color-blue font-sans '>

                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>Add teammates to your workspace</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>
                        Import and transcribe 10* audio or video files per month</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>Advanced search, export, and playback</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>1200 monthly transcription minutes; 90 minutes per conversation</p> </span>

                </div>
            </div>
        </div>
    )
}

export default ProPlan
