import React, { useEffect } from 'react'
import UserProfileLayout from './UserProfileLayout'
import { useUserAuth } from '../../context/UserAuthContext'
import { useState } from 'react'
import { reauthenticateWithCredential, updatePassword, updateProfile, } from 'firebase/auth';
import { auth } from '../../firebase';
import { EmailAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { database } from "../../firebase";

import { Button } from '../ui/button';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthHook } from '@/GlobalState/customHooks/useAuthHook';
import { setIsMfaActive } from "../../GlobalState/features/authSlice"
const UserSecurity = () => {


    const { user, logOut } = useUserAuth();
    const [password, setPassword] = useState(user.password || ""); // You can add a password field here for updating the password


    const { isMfaActive } = useSelector((state) => state.auth);
    const { checkMfaActive } = useAuthHook()
    const dispatch = useDispatch()
    const [previousPassword, setPreviousPassword] = useState("")
    const navigate = useNavigate();

    // Function to update password

    const handleUpdatePassword = async () => {
        try {
            // Ensure that the user is authenticated
            if (user) {
                // Check if the previous password is correct
                const credential = EmailAuthProvider.credential(user.email, previousPassword)

                try {
                    await reauthenticateWithCredential(user, credential);
                } catch (reauthError) {
                    toast.error("Please provide correct credentials");
                    return;
                }

                // If the previous password is correct, update the profile and password

                if (password) {
                    await updatePassword(auth.currentUser, password);
                }

                // Display a success message
                toast.success("Password updated successfully!");
                await logOut()
                navigate("/login")

            } else {
                // Handle the case where the user is not authenticated
                alert("User is not authenticated. Please log in.");
            }
        } catch (error) {
            // Handle any errors here
            alert("An error occurred while updating the profile: " + error.message);
        }

    }



    // Multi factor authentication logic

    console.log("is mfa active", isMfaActive)



    const handleResetMfa = async () => {
        try {


            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/reset`, { userId: user.uid }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = response.data
            if (data.success === true) {
                toast.success("2FA disabled")
                dispatch(setIsMfaActive(false))
            }

            console.log("data:", data)
        } catch (error) {
            console.log("error", error)
        }
    }



    // useEffect(() => {
    //     checkMfaActive()
    // }, [user])



    return (
        <UserProfileLayout>


            <div className='md:w-2/3 min-h-[400px] flex  p-5 bg-blackGray rounded-md'>

                <div className='w-2/3 flex flex-col gap-4'>
                    <h2 className='text-xl font-medium py-3'>Pssword Reset</h2>

                    <span className='w-full flex justify-between items-center p-2'>
                        <label className='text-sm' htmlFor="name">Old Password</label>
                        <input value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)} type="text" className=' max-[550px]:mx-3 px-3 py-2 md:w-2/3 w-44 bg-bg-gray-new  rounded-sm outline-none' />
                    </span>

                    <span className='w-full flex justify-between items-center p-2'>

                        <label className='text-sm' htmlFor="email">New Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className=
                            'max-[550px]:mx-3 px-3 py-2 md:w-2/3 w-44  bg-bg-gray-new  rounded-sm outline-none' />

                    </span>
                    <span className='flex justify-end'>
                        <a href='/forgetPassword' className='hover:underline cursor-pointer'>Forget password?</a>
                    </span>

                    <div className='flex items-center  py-4'>
                        <button onClickCapture={handleUpdatePassword} className='px-5 md:w-2/5 py-3 bg-bg-purple text-white rounded-3xl hover:bg-purple-600-600'>Update Password</button>
                    </div>

                    <div className='border p-2 '>
                        <h1 className='small-title my-2'>Two Factor Authentication</h1>

                        <span>
                            {
                                isMfaActive ?

                                    <span className='flex flex-col gap-6 p-2 '>
                                        <p className='text-gray-300'>2FA is Active</p>
                                        <Button onClick={handleResetMfa} className='w-36 rounded-xl text-white  bg-red-600 hover:bg-red-600/80'>Disable</Button>
                                    </span>

                                    :

                                    <span className='flex flex-col gap-6 p-2'>
                                        <p>2FA is not active</p>
                                        <Button onClick={() => {
                                            navigate('/mfa')
                                        }} className='w-36 rounded-xl text-white  ' variant={'customLightPurple'}>Enable 2FA</Button>
                                    </span>
                            }
                        </span>
                    </div>

                </div>

            </div>


        </UserProfileLayout>
    )
}

export default UserSecurity
