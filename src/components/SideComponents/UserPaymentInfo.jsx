import React from 'react'
import UserProfileLayout from './UserProfileLayout'
import PlanDetails from '../pricing/PlanDetails'
const UserPaymentInfo = () => {
  return (
    <UserProfileLayout>


      <div className='w-full flex flex-col'>
       
<PlanDetails/>
        

      </div>


    </UserProfileLayout>
  )
}

export default UserPaymentInfo
