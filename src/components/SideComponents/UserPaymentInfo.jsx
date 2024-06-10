import React from 'react'
import UserProfileLayout from './UserProfileLayout'
import PlanDetails from '../pricing/PlanDetails'
import CreditInfo from './CreditInfo'
const UserPaymentInfo = () => {
  return (
    <UserProfileLayout>


      <div className='w-full flex flex-row gap-5'>

        <PlanDetails />
        <CreditInfo/>


      </div>


    </UserProfileLayout>
  )
}

export default UserPaymentInfo
