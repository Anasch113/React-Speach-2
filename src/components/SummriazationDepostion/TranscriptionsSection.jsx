import React from 'react'
import { useUserAuth } from '@/context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../PreAudio/Spinner';
const TranscriptionsSection = ({
    processing,
    dbdata,
    reloadLoading,
    summaryName,
    depositionType,
    selectedValue


}) => {
    const { fileDurations, fileNames, } = useUserAuth();
    const navigate = useNavigate()

    console.log("dbdata", dbdata)


    const handleNavigate = (id) => {

        console.log("transcription id", id)
        navigate(`/view-summarization-deposition/${id}`);


    }


    // console.log("segments:", data.summaryDeposition && data.summaryDeposition.segments)
    // console.log("timestamps:", data.summaryDeposition && data.summaryDeposition.timestamps)
    // console.log("summaries:", data.summaryDeposition && data.summaryDeposition.summaries)

    return (
        <div className='w-full md:p-5 p-1  rounded-lg my-5 bg-bg-navy-blue'>
            {
                reloadLoading ? <Spinner /> :

                    <table className="w-full  flex flex-col   ">

                        <thead className='my-2'>
                            <tr className="font-poppins text-sm flex md:gap-10 sm:items-center md:justify-between  md:px-5">

                                <th className=" text-text-brown-new md:px-10 md:py-2">Name</th>

                                <span>
                                    <th className=" text-text-brown-new md:px-10 md:py-2  w-72">Format</th>
                                    <th className=" text-text-brown-new md:px-10 md:py-2 px-2">Deponant</th>
                                    <th className=" text-text-brown-new md:px-10 md:py-2 ">Status</th>

                                </span>

                            </tr>

                        </thead>
                        <div className=' my-5  border '></div>
                        <tbody className='flex flex-col-reverse max-h-[400px] overflow-y-auto  py-4'>


                            {
                                dbdata && dbdata.map((data, index) => (

                                    <tr onClick={() => handleNavigate(data._id)} key={index} className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] flex justify-between items-center md:gap-10 md:px-5 border-b hover:text-text-black px-1">

                                        <td className="max-[500px]:w-32 font-medium md:text-lg md:px-5 md:py-5 hover:text-text-black">{data.summaryName}</td>
                                        <span>
                                            <td className=" font-medium md:text-lg text-sm px-5 py-5">
                                                {data.depositionType}
                                            </td>
                                            {/* 
                                            <td className="  md:w-72  font-medium md:text-lg  md:py-5">{new Date(data.date).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}</td> */}
                                            <td className=" font-medium md:text-lg text-sm px-5 py-5">
                                                {data.deponant}
                                            </td>


                                            <td className="  font-medium text-lg md:px-5 md:py-5"><img className='w-6 h-6' src="/greentick.png" alt="" /></td>
                                        </span>



                                    </tr>
                                ))
                            }
                            {
                                processing &&
                                <tr className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] flex justify-between items-center md:gap-10 md:px-5 border-b hover:text-text-black px-1">

                                    <td className="max-[500px]:w-32 font-medium md:text-lg md:px-5 md:py-5 hover:text-text-black"> {
                                        summaryName
                                    }</td>
                                    <span>
                                        <td className=" font-medium text-lg px-5 py-5">
                                            {
                                                depositionType
                                            }

                                        </td>
                                        {/* <td className="  md:w-72  font-medium md:text-lg  md:py-5">{new Date().toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true // 12-hour format
                                        })}</td> */}
                                        <td className=" font-medium text-lg px-5 py-5">
                                                {selectedValue}
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


            }




            {
                !dbdata.length > 0 && <span className=' w-full flex  items-center justify-center py-6 flex-col gap-8'>

                    <img src="/noFile.png" className='w-28 h-28' alt="" />
                    <p>No Files to Display</p>
                </span>

            }




        </div>
    )
}

export default TranscriptionsSection
