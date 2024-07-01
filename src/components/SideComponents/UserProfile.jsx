import React, { useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';

const UserProfile = () => {

  const { user } = useUserAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })

  const handleInputChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value
    })
  }
  const hanldeUpdate = async () => {

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.name,

      })
      toast.success("Username has been changed")
      window.location.reload()
    } catch (error) {
      console.log("Error updating profile", error);
    }

  }

  return (
    <div className='w-2/3 h-[500px] flex  p-5 bg-blackGray rounded-md'>

      <div className='w-2/3 flex flex-col gap-4'>
        <h2 className='text-xl font-medium py-3'>Account Info</h2>

        <span className='w-full flex justify-between items-center p-2'>

          <label className='text-sm' htmlFor="name">Name</label>
          <input value={formData.name} onChange={(e) => handleInputChange(e, 'name')} type="text" placeholder={user.displayName || ""} className='px-3 bg-bg-gray-new py-2 w-2/3    rounded-sm outline-none' />
        </span>

        <span className='w-full flex justify-between items-center p-2'>

          <label className='text-sm' htmlFor="email">Email</label>
          <input value={formData.email} placeholder={user.email || ""} type="text" className='px-3 py-2 w-2/3  bg-bg-gray-new rounded-sm outline-none' />

        </span>
        <div className='flex items-center  py-4'>
          <button onClick={hanldeUpdate} className='px-5 w-2/5 py-3 bg-bg-purple text-white rounded-3xl hover:bg-purple-500'>Save Changes</button>
        </div>

      </div>

    </div>
  )
}

export default UserProfile
