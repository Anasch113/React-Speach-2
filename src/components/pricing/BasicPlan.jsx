import React from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { Link } from 'react-router-dom';
const BasicPlan = ({ checkout }) => {

    const { paymentInfo } = useUserAuth();

    console.log(paymentInfo)


    return (


        <div className={` ${paymentInfo.planType === "free trial" ? "card" : "null"} flex flex-col px-10 justify-center bg-white w-96 min-h-400  rounded-3xl gap-10  py-10 max-[500px]:w-80`}>
            <div className='font-poppins flex flex-col gap-4 '>
                <span className='flex flex-row items-center gap-3' >

                    <img className='rounded-full p-3 bg-[#009996] w-12' src="/mic.png" alt="img" />
                    <p className='text-[#009996] font-medium  font-roboto  text-3xl'>Basic</p>
                </span>


                <p className='text-gray-500 font-roboto py-5 w-56'> The easiest way to try Captify</p>
                <span className='flex flex-col  gap-5 py-2'>
                    <span className='flex items-center gap-2'>

                        <p className='font-bold text-4xl' >Free</p>
                        {/* <span className='flex justify-center flex-col'>
                            <p>USD </p>
                            <p className='text-gray-500'>per/month </p>
                        </span> */}

                    </span>

                    <p className='bg-[#e1f7f7] p-1 w-2/4 text-center rounded-2xl text-[#009996] text-sm px-2'>Billed annually</p></span>


            </div>

            <div className=''>
                {
                    paymentInfo.planType === "free trial" ?

                        (
                            <div className='flex flex-col gap-2'>
                                <p className='text-text-color-blue text-lg py-2'>&#10003; You have subscribed this plan</p>
                      <Link to={"/plandetails"}>  <button  className='bg-gray-500 hover:bg-gray-400 py-3 text-lg px-2 rounded-md w-48 text-white text-center'>See Plan Details</button>
                      </Link>
                        </div>
                        
                        ) :

                        (<button onClick={() => checkout("basic")} className='font-poppins bg-[#009996]  py-3 px-3 rounded-3xl w-44 text-white hover:bg-[#55c6c5]'>
                            Get Now
                        </button>)
                }

            </div>

            <div className='flex flex-col p-2 gap-4  pt-5 '>
                <p className='font-poppins -ml-2 text-lg'>Everything in basic+</p>

                <div className='flex flex-col gap-2 text-text-color-blue font-sans '>

                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>AI meeting assistant records, transcribes, captures slides, and generates summaries in real time</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>
                        Joins Zoom, MS Teams, and Google Meet to automatically write and share notes</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>300 monthly transcription minutes; 30 minutes per conversation; Import and transcribe 3* audio or video files lifetime</p> </span>


                </div>
            </div>
        </div>

    )
}

export default BasicPlan
