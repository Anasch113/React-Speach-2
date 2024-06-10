import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { GrSync } from "react-icons/gr";
import { useState } from 'react';
import { MdPayment } from "react-icons/md";
import { useUserAuth } from '../../context/UserAuthContext';

const Transcripted = ({
    data,
    file,
    processing,

    isTranscriptions,

    setShowFormModal,
    showFormModal,
    dbData,
    isPaymentInProgress,
    setShowPaymentModal,
    showPaymentModal


}) => {



    const navigate = useNavigate();
    const { user } = useUserAuth();

    const [isView, setIsView] = useState(false);


    const handleNavigate = (id) => {

        if (processing === true) {
            return
        }


        navigate(`/resyncingAi/view-sync-file/${id}`);


    }


    return (
        <>

            <div className='border md:w-full shadow-md p-5 flex flex-col  gap-8 min-h-[300px] '>

                <span className='flex flex-row justify-between items-center gap-2 py-5'>

                    <span className='flex flex-row items-center gap-2'>
                        <RxDashboard className='text-3xl' />
                        <h1 className='text-3xl font-bold font-poppins text-text-black'> Recent Files</h1>
                    </span>
                    <div className='flex gap-2 w-2/6  justify-end'>
                        {
                            isPaymentInProgress && <button onClick={() => setShowPaymentModal(!showPaymentModal)} className='text-center p-2 w-20 h-16 
                            rounded-3xl bg-purple-500 text-white text-xl font-medium font-roboto hover:bg-purple-400 '><span className='flex items-center text-center justify-center '>
                                    <MdPayment size={25} />
                                </span></button>
                        }

                        <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-3 w-60 h-16 
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                <FaCloudUploadAlt size={25} /> <p>Transcribe Files </p>
                            </span></button>

                    </div>



                </span>



                <div >
                    <table className="  flex flex-col  ">

                        <thead className='my-2'>
                            <tr className="font-poppins gap-10  flex justify-between px-5">

                                <th className="flex-1 text-text-brown-new  py-2">Audio File Name</th>
                                <th className=" text-text-brown-new  py-2">Text File Name</th>

                                <span className='flex gap-5'>
                                    <th className=" text-text-brown-new  py-2">Mode</th>
                                    <th className=" text-text-brown-new  py-2">Status</th>
                                </span>
                            </tr>

                        </thead>
                        <div className=' my-5  border '></div>
                        <tbody className='flex px-2 flex-col-reverse max-h-[400px] overflow-y-scroll  py-4'>

                            {
                                dbData && dbData.map((file, i) => (
                                    <tr key={i} onClick={() => handleNavigate(file._id)} className="font-poppins   cursor-pointer hover:bg-[#EDEDED]   flex justify-between gap-10 px-5 border-b">

                                        <td className="flex-1 text-text-black font-medium  py-5 "> {file.audioFilename}</td>
                                        {/* You can set date and duration as needed for the files from props */}
                                        <td className=" text-text-black font-medium  py-5 ">{file.transcriptFilename}</td>

                                        <span className='flex gap-5'>

                                            <td className=" text-text-black font-medium  py-5">

                                                Resync
                                            </td>
                                            <td className=" text-text-black font-medium py-5">

                                                <img className='w-6 h-6' src="/greentick.png" alt="" />
                                            </td>
                                        </span>
                                    </tr>
                                ))
                            }

                            {
                                isTranscriptions &&
                                <tr className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] hover:rounded-3xl  py-3">

                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{file && file.audio}</td>

                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{file && file.transcript}</td>
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">

                                        Resync
                                    </td>

                                    <td className=" text-text-black font-medium text-lg px-20 py-2">

                                        {processing ? <div className='spinner'></div> : "Completed"}
                                    </td>
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
