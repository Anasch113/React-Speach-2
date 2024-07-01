import React from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import Sidebar from '../../layout/Sidebar';
import { Link } from 'react-router-dom';
import { CiCalendarDate } from "react-icons/ci";

import { CiTimer } from "react-icons/ci";
const PlanDetails = () => {
    const { paymentInfo } = useUserAuth();
    console.log("payment info", paymentInfo)
    return (
        <div className='flex w-full'>


            {
                paymentInfo.length === 0 ? (
                    <div className='bg-blackGray border md:w-full p-5 rounded-lg  flex items-center justify-center flex-col'>
                        <img  className='w-56 h-56' src="/noplan.png" alt="" />
                        <p className='font-medium text-lg'>No plan Activated</p>
                    </div>
                ) : (
                <div className='bg-bg-navy-blue md:w-full p-5 rounded-lg border'>
                    <p className='text-2xl py-2'>Plan Type: {paymentInfo.planType}</p>

                    <div className='flex flex-col gap-3 px-2 py-5'>
                        <span className='flex  items-center gap-3 py-1'> <CiCalendarDate size={30} /> <p className='font-medium text-lg'>Start Date: </p><p className='text-lg'> {paymentInfo.planStartDate} </p></span>
                        <span className='flex gap-3 py-1 items-center'> <CiCalendarDate size={30} /> <p className='font-medium text-lg'>End Date: </p> <p className='text-lg'>{paymentInfo.planEndDate}</p> </span>
                        <span className='flex gap-3 py-1 items-center'> <CiTimer size={30} /> <p className='font-medium text-lg'>Plan Duration: </p> <p className='text-lg'>{paymentInfo.planDuration} days</p>  </span>

                    </div>

                    <Link to={"/pricing"}><button className='px-5 py-3 bg-bg-blue text-white rounded-3xl'>Change Plan</button></Link>

                </div>)
            }



        </div>
    )
}

export default PlanDetails
