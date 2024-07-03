import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { MdPayment } from "react-icons/md";
import { useState } from 'react';

import { useUserAuth } from '../../context/UserAuthContext';

const Transcripted = ({
    transcriptions,
    filename,
    processing,
    subtitle,
    setTranscriptions,
    dbData,
    setShowFormModal,
    showFormModal,
    fileDuration,
    isPaymentInProgress,
    setShowPaymentModal,
    showPaymentModal

}) => {
    console.log(transcriptions)
    const navigate = useNavigate();
    const { user } = useUserAuth();

    const [isView, setIsView] = useState(false);


    const handleNavigate = (id) => {

        console.log("transcription id", id)
        navigate(`/pre-audio-transcriptions/view/${id}`);


    }


    return (
        <>

            <div className='border md:w-full shadow-md md:p-5 px-2 flex flex-col  gap-8 min-h-[300px] '>

                <span className='flex flex-row justify-between items-center gap-2 py-5'>

                    <span className='flex flex-row items-center gap-2'>
                        <RxDashboard className='md:text-3xl text-lg' />
                        <h1 className='md:text-3xl font-bold font-poppins text-white lack'> Recent Files</h1>
                    </span>

                    <div className='flex gap-2 w-2/6  justify-end'>
                        {
                            isPaymentInProgress && <button onClick={() => setShowPaymentModal(!showPaymentModal)} className='text-center md:p-2 p-4 md:w-20 md:h-20 
                            rounded-3xl bg-purple-500 text-white md:text-xl font-medium font-roboto hover:bg-purple-400 '><span className='flex items-center text-center justify-center '>
                                    <MdPayment className='text-2xl'  />
                                </span></button>
                        }

                        <button onClick={() => setShowFormModal(!showFormModal)} className='text-center md:px-5 md:py-3 md:w-60 md:h-16 p-2
rounded-md bg-bg-purple text-white md:text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2'>
                                <FaCloudUploadAlt size={25} /> <p>Transcribe Files </p>
                            </span></button>

                    </div>



                </span>



                <div >
                    <table className="  flex flex-col  ">

                        <thead className='my-2'>
                            <tr className="font-poppins text-sm flex md:gap-10 sm:items-center md:justify-between  md:px-5">

                                <th className=" text-text-brown-new md:px-10 md:py-2">Name</th>

                                <span>
                                    <th className=" text-text-brown-new md:px-10 md:py-2  w-72">Uploaded</th>
                                    <th className=" text-text-brown-new md:px-10 md:py-2 px-2">Duration</th>
                                    <th className=" text-text-brown-new md:px-10 md:py-2 ">Status</th>

                                </span>

                            </tr>

                        </thead>
                        <div className=' my-5  border '></div>
                        <tbody className='flex flex-col-reverse max-h-[400px] overflow-y-scroll  py-4'>



                            {
                                dbData && dbData.map((data, index) => (

                                    <tr onClick={() => handleNavigate(data.id)} key={index} className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] flex justify-between items-center md:gap-10 md:px-5 border-b hover:text-text-black px-1">

                                        <td className="max-[500px]:w-32 font-medium md:text-lg md:px-5 md:py-5 hover:text-text-black">{data.filename}</td>
                                        <span>
                                            <td className="  md:w-72  font-medium md:text-lg  md:py-5">{new Date(data.date).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}</td>

                                            <td className=" font-medium text-lg px-5 py-5">
                                                {`${data.audio_duration <= 60 ? `${data.audio_duration} s` : `${(data.audio_duration / 60).toFixed(1)} min`}`}
                                            </td>


                                            <td className="  font-medium text-lg md:px-5 md:py-5"><img className='w-6 h-6' src="/greentick.png" alt="" /></td>
                                        </span>



                                    </tr>
                                ))
                            }
                            {
                                processing &&
                                <tr className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] flex justify-between items-center md:gap-10 md:px-5 border-b hover:text-text-black px-1">

                                    <td className="max-[500px]:w-32 font-medium md:text-lg md:px-5 md:py-5 hover:text-text-black">{filename}</td>
                                    <span>
                                        <td className="  md:w-72  font-medium md:text-lg  md:py-5">{new Date().toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true // 12-hour format
                                        })}</td>
                                        <td className=" font-medium text-lg px-5 py-5">
                                            {/* Always show spinner for files being processed */}
                                            {`${fileDuration} min`}
                                        </td>
                                        <td className="  font-medium text-lg md:px-5 md:py-5">
                                            {/* Always show spinner for files being processed */}
                                            <div className='spinner'></div>
                                        </td>
                                    </span>



                                </tr>

                            }
                        </tbody>

                    </table>

                </div>

            </div>




        </>
    )
}

export default Transcripted
