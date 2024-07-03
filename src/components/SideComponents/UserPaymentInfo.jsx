import React from 'react'
import UserProfileLayout from './UserProfileLayout'
import PlanDetails from '../pricing/PlanDetails'
import CreditInfo from './CreditInfo'
const UserPaymentInfo = () => {
  return (
    <UserProfileLayout>


      <div className='w-full flex md:flex-row gap-5 flex-col '>

        <PlanDetails />
        <CreditInfo/>


      </div>


    </UserProfileLayout>
  )
}

export default UserPaymentInfo
