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

            <div className='border md:w-full shadow-md md:p-5 px-2 flex flex-col  gap-8 min-h-[300px] '>

                <span className='flex flex-row justify-between items-center gap-2 py-5'>

                    <span className='flex flex-row items-center gap-2'>
                        <RxDashboard className='md:text-3xl' />
                        <h1 className='md:text-3xl font-bold font-poppins '> Recent Files</h1>
                       
                    </span>

                    <div className='flex gap-2 w-2/6  justify-end'>
                        {
                            isPaymentInProgress && <button onClick={() => setShowPaymentModal(!showPaymentModal)} className='text-center p-2 w-20 h-16 
                            rounded-3xl bg-purple-500 text-white text-xl font-medium font-roboto hover:bg-purple-400 '><span className='flex items-center text-center justify-center '>
                                    <MdPayment size={25} />
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

                                <th className=" text-text-brown-new md:px-10 md:py-2 max-[500px]:w-24">Audio File Name</th>
                                <th className=" text-text-brown-new md:px-10 md:py-2 max-[500px]:w-24">Text File Name</th>

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
                                    <tr key={i} onClick={() => handleNavigate(file._id)} className="font-poppins   cursor-pointer hover:bg-[#EDEDED] hover:text-black   flex justify-between md:gap-10 md:px-5 border-b md:text-lg text-sm">

                                        <td className="flex-1  font-medium  py-5 max-[500px]:w-32 "> {file.audioFilename}</td>
                                        {/* You can set date and duration as needed for the files from props */}
                                        <td className="  font-medium  py-5 max-[500px]:w-32">{file.transcriptFilename}</td>

                                        <span className='flex gap-5'>

                                            <td className="  font-medium  py-5">

                                                Resync
                                            </td>
                                            <td className="  font-medium py-5">

                                                <img className='w-6 h-6' src="/greentick.png" alt="" />
                                            </td>
                                        </span>
                                    </tr>
                                ))
                            }

                            {
                                isTranscriptions &&
                                <tr className="font-poppins   cursor-pointer hover:bg-[#EDEDED] hover:text-black   flex justify-between md:gap-10 md:px-5 border-b md:text-lg text-sm">

                                    <td className="flex-1  font-medium  py-5 max-[500px]:w-32 ">{file && file.audio}</td>

                                    <td className="  font-medium text-lg px-20 py-2">{file && file.transcript}</td>
                                    <td className="  font-medium text-lg px-20 py-2">

                                        Resync
                                    </td>

                                    <td className="  font-medium text-lg px-20 py-2">

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
