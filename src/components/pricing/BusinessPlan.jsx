import React from 'react'

const BusinessPlan = ({ checkout }) => {
    return (
        <div className="flex flex-col px-10   justify-center bg-white w-96 min-h-400  rounded-3xl gap-10  py-10 max-[500px]:w-80">
            <div className='font-poppins flex flex-col gap-4 '>
                <span className='flex flex-row items-center gap-3' >

                    <img className='rounded-full p-3 bg-[#B443B0] w-12' src="/building.png" alt="img" />
                    <p className='text-[#B443B0] font-medium  font-roboto  text-3xl'>Business</p>
                </span>


                <p className='text-gray-500 font-roboto py-5 w-56'> Greater productivity for business</p>
                <span className='flex flex-col  gap-5 py-2'>
                    <span className='flex items-center gap-2'>

                        <p className='font-bold text-3xl' >$20</p>
                        <span className='flex justify-center flex-col'>
                            <p>USD </p>
                            <p className='text-gray-500'>per/month </p>
                        </span>

                    </span>

                    <p className='bg-[#f9e4f8] p-1 w-2/4 text-center rounded-2xl text-[#B443B0] text-sm px-2'>Billed annually</p></span>


            </div>

            <div className=''>
                <button onClick={() => checkout("business")} className='font-poppins bg-[#B443B0]  py-3 px-3 rounded-3xl w-44 text-white hover:bg-[#5b70e7]'>
                    Get Now
                </button>
            </div>

            <div className='flex flex-col p-2 gap-4  pt-5 '>
                <p className='font-poppins -ml-2 text-lg'>Everything in business +</p>

                <div className='flex flex-col gap-2 text-text-color-blue font-sans '>

                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>Admin features: usage analytics, prioritized support</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>
                    Joins up to 3 concurrent virtual meetings to automatically write and share notes</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>6000 monthly transcription minutes; 4 hours per conversation</p> </span>
                    <span className='flex   gap-2 '> <span className="w-2 h-2 bg-blue-500 rounded-full  mt-2"></span> <p className='w-60'>Import and transcribe unlimited* audio or video files</p> </span>

                </div>
            </div>
        </div>
    )
}

export default BusinessPlan
