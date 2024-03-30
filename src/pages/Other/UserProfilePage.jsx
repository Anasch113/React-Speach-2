import React from 'react'
import UserProfileLayout from '../../components/SideComponents/UserProfileLayout'
import UserProfile from '../../components/SideComponents/UserProfile'
const UserProfilePage = () => {
  return (
    <UserProfileLayout>


      <div className='w-full flex flex-col'>
       

        <UserProfile />

      </div>


    </UserProfileLayout>
  )
}

export default UserProfilePage
