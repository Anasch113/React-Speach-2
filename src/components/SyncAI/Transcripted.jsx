import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';

import { useUserAuth } from '../../context/UserAuthContext';

const Transcripted = ({
    data,
    file,
    processing,
   
    isTranscriptions,

    setShowFormModal,
    showFormModal,
    dbData


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
                    <div>
                        <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-3 w-full h-16
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                <FaCloudUploadAlt size={25} /> <p>Sync Files </p>
                            </span></button>

                    </div>



                </span>



                <div >
                    <table className="  flex flex-col  ">

                        <thead className='my-2'>
                            <tr className="font-poppins text-sm">

                                <th className=" text-text-brown-new px-20 py-2">Audio File Name</th>
                                <th className=" text-text-brown-new px-20 py-2">Text File Name</th>

                                <th className=" text-text-brown-new px-20 py-2">Mode</th>
                                <th className=" text-text-brown-new px-20 py-2">Status</th>



                            </tr>

                        </thead>
                        <div className=' my-5  border '></div>
                        <tbody className='flex px-2 flex-col-reverse max-h-[400px] overflow-y-scroll  py-4'>

                            {
                              dbData && dbData.map((file, i)=>(
                                    <tr key={i} onClick={() => handleNavigate(file._id)} className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] hover:rounded-3xl py-3 ">

                                    <td className=" text-text-black font-medium text-lg px-20 py-2"> {file.audioFilename}</td>
                                    {/* You can set date and duration as needed for the files from props */}
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{file.transcriptFilename}</td>

                                    <td className=" text-text-black font-medium text-lg px-20 py-2">
                                      
                                      resync
                                    </td>
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">
                                      
                                        {file.status}
                                    </td>
                                </tr>
                                ))
                            }

                            {
                                isTranscriptions && 
                                <tr  className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] hover:rounded-3xl  py-3">

                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{file && file.audio.name}</td>
                                   
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{file && file.transcript.name}</td>
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">
                                      
                                      resync
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
