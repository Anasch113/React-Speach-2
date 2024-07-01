

import React, { useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

import { CiCalendarDate } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { MdOutlineCreditScore } from "react-icons/md";
import { CiTimer } from "react-icons/ci";


import axios from "axios"
const CreditInfo = () => {


    const [minutes, setMinutes] = useState('');
    const [total, setTotal] = useState(0);

    const handleMinutesChange = (e) => {
        const value = e.target.value;
        setMinutes(value);
        setTotal(value * 0.5);
    };



    const { userBalance, user } = useUserAuth();


    // Function to create Stripe session
    const createStripeSession = async (total, method) => {
        const userId = user.uid
        try {

            if (total && method && method === "credit-method") {
                const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/buy-credit`, { total, method, userBalance, userId });


                return response.data;
            }


        } catch (error) {
            console.error("Error creating Stripe session", error);
            return null;
        }
    };


    const handlePaymentOptions = async (total, method) => {

        try {
            if (total && method === "credit-method") {

                // For credit method

                const stripeSession = await createStripeSession(total, method);

                if (stripeSession && stripeSession.url) {
                    // Redirect the user to Stripe Checkout
                    window.location.href = stripeSession.url;
                } else {
                    alert("Failed to create Stripe session. Please try again.");
                }
            }


        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className='flex w-full'>




            <div className='bg-blackGray md:w-full p-5 rounded-lg border'>
                <p className='text-2xl py-2'>Credit Info</p>

                <div className='flex flex-col gap-3 px-2 py-5'>


                    {/* Showing current Credit  */}
                    <span className='flex  items-center gap-3 py-1'> <MdOutlineCreditScore size={30} /> <p className='font-medium text-lg'>Current Balance </p><p className='text-lg'> {userBalance.toFixed(2)} $ </p></span>
                    <span className='flex  items-center gap-3 py-1'> <CiTimer size={30} /> <p className='font-medium text-lg'>Total Minutes </p><p className='text-lg'> {userBalance.toFixed(2) * 2} min </p></span>

                    {/* Buy Credit Inputs  */}
                    <span className='flex flex-row gap-2 my-1'>

                        <span className='flex flex-col justify-between items-start gap-1'>
                            <label className=' text-center font-medium  font-poppins'>Amount of Minutes* </label>
                            <input type='number' value={minutes}
                                onChange={handleMinutesChange} className='bg-bg-gray-new  font-medium  font-poppins p-2 rounded-sm'></input>

                        </span>

                        <span className='flex flex-col justify-between items-start gap-1'>

                            <label className='0 text-center font-medium  font-poppins'>Total* </label>
                            <input type='text' value={`${total}$`}
                                readOnly placeholder='20$' className='  font-medium  font-poppins p-2 bg-bg-gray-new rounded-sm text-center' ></input>
                        </span>

                    </span>


                </div>


                {/* Buy Credit Button */}
                <button onClick={() => handlePaymentOptions(total, "credit-method")} className='text-center px-5 py-3 w-2/4 h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-purple-500 mb-2 '><span className='flex items-center text-center justify-center gap-2 '>
                        <MdPayment size={25} /> <p>Purchase </p>
                    </span></button>

            </div>


        </div>
    )
}

export default CreditInfo
