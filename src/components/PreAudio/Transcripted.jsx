import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

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
    showFormModal

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

            <div className='border md:w-full shadow-md p-5 flex flex-col  gap-8 min-h-[300px] '>

                <span className='flex flex-row justify-between items-center gap-2 py-5'>

                    <span className='flex flex-row items-center gap-2'>
                        <RxDashboard className='text-3xl' />
                        <h1 className='text-3xl font-bold font-poppins text-text-black'> Recent Files</h1>
                    </span>
                    <div>
                        <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-3 w-full h-16
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                <FaCloudUploadAlt size={25} /> <p>Transcribe Files </p>
                            </span></button>

                    </div>



                </span>



                <div >
                    <table className="  flex flex-col  ">

                        <thead className='my-2'>
                            <tr className="font-poppins text-sm flex gap-10 justify-between px-5">

                                <th className=" text-text-brown-new px-10 py-2">Name</th>

                                <span>
                                    <th className=" text-text-brown-new px-10 py-2  w-72">Uploaded</th>
                                    <th className=" text-text-brown-new px-10 py-2">Duration</th>
                                    <th className=" text-text-brown-new px-10 py-2">Status</th>

                                </span>

                            </tr>

                        </thead>
                        <div className=' my-5  border '></div>
                        <tbody className='flex flex-col-reverse max-h-[400px] overflow-y-scroll  py-4'>



                            {
                                dbData && dbData.map((data, index) => (

                                    <tr onClick={() => handleNavigate(data.id)} key={index} className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] flex justify-between gap-10 px-5 border-b">

                                        <td className=" text-text-black font-medium text-lg px-5 py-5 ">{data.filename}</td>
                                        <span>
                                            <td className="  w-72 text-text-black font-medium text-lg  py-5">{new Date(data.date).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}</td>

                                            <td className=" text-text-black  font-medium text-lg px-5 py-5">{`${data.audio_duration}s`}</td>

                                            <td className=" text-text-black font-medium text-lg px-5 py-5"><img className='w-6 h-6' src="/greentick.png" alt="" /></td>
                                        </span>



                                    </tr>
                                ))
                            }
                            {
                                processing &&
                            <tr className="font-poppins text-sm border-b  cursor-pointer hover:bg-[#EDEDED] hover:rounded-3xl flex justify-between gap-10 px-5">
                                <td className=" text-text-black font-medium text-lg p-6">{filename}</td>
                                <span>
                                    <td className=" text-text-black   font-medium text-lg p-6">{new Date().toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true // 12-hour format
                                    })}</td>
                                    <td className=" text-text-black font-medium text-lg p-6">
                                        {/* Always show spinner for files being processed */}
                                        Calculating...
                                    </td>
                                    <td className=" text-text-black font-medium text-lg p-6">
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
