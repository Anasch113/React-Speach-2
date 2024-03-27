import React from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import Sidebar from '../../layout/Sidebar';
import { Link } from 'react-router-dom';
const PlanDetails = () => {
    const { paymentInfo } = useUserAuth();
    return (
        <div className='flex'>

            <Sidebar />
            <div className='bg-[#F2F2F3] w-full min-h-screen p-5 '>

                <div className='bg-white w-2/4 p-5 rounded-lg'>
                    <p className='text-3xl py-2'>Plan Type: {paymentInfo.planType}</p>

                    <div className='px-2 py-5'>
                        <span className='flex gap-3 py-1'> <p className='font-medium text-xl'>Start Date: </p><p className=''> {paymentInfo.planStartDate} </p></span>
                        <span className='flex gap-3 py-1'>  <p className='font-medium text-xl'>End Date: </p> <p>{paymentInfo.planEndDate}</p> </span>
                        <span className='flex gap-3 py-1'> <p className='font-medium text-xl'>Plan Duration: </p> <p>{paymentInfo.planDuration} days</p>  </span>

                    </div>

                  <Link to={"/pricing"}><button className='px-5 py-3 bg-bg-blue text-white rounded-3xl'>Back to pricing</button></Link>  

                </div>

            </div>
        </div>
    )
}

export default PlanDetails
