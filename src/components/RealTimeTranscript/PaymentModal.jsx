import React from 'react'
import { MdOutlinePaid } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios'
import { useUserAuth } from '../../context/UserAuthContext';
import { useAsyncValue } from 'react-router-dom';
import PaymentAdditionalInfo from '../SideComponents/PaymentAdditionalInfo';
const PaymentModal = ({
    fileName,
    duration,
    cost,

    setShowPaymentModal,
    setCost,
    currentBalance,
    handleTranscriptions
}) => {


    const [minutes, setMinutes] = useState('');
    const [total, setTotal] = useState(0);
    const { user } = useUserAuth()

    const handleMinutesChange = (e) => {
        const value = e.target.value;
        setMinutes(value);
        setTotal(value * 1);
    };



    // >>>>>>>>> Additional Info code >>>>>>>>>>>>>>>>>>


    const [promoCode, setPromoCode] = useState("");

    const [currency, setCurrency] = useState('USD'); // Default to USD


    const handlePromodeCodeChange = (e) => {
        const value = e.target.value;
        setPromoCode(value)
    };


    const handleCurrencyChange = (newCurrency) => {

        setCurrency(newCurrency); // Update the selected currency
    };
    console.log("selected currency:", currency)


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    // Function to create Stripe session
    const createStripeSession = async () => {
        const userId = user.uid
        const userEmail = user.email
        const userName = user.displayName
        try {


            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/virtual-transcript-payment`, { total, userId, minutes, promoCode, currency, userEmail, userName });


            return response.data;


        } catch (error) {
            console.error("Error creating Stripe session", error);
            return null;
        }
    };

    const handlePaymentOptions = async () => {

        try {

            // For direct method
            const stripeSession = await createStripeSession();

            if (stripeSession && stripeSession.url) {
                // Redirect the user to Stripe Checkout
                window.location.href = stripeSession.url;
            } else {
                alert("Failed to create Stripe session. Please try again.");
            }

        } catch (error) {
            console.log("error", error)
        }
    }





    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 py-3">
            <div className="bg-bg-navy-blue md:min-h-[500px] md:max-h-[700px] w-[500px] p-5 rounded-xl overflow-y-auto  overflow-x-hidden z-50">

                <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                    <span className='flex flex-1  flex-row items-center gap-2'>
                        {/* <MdOutlinePaid className='text-2xl' /> */}
                        <h1 className='text-2xl font-semibold font-poppins '> Billing </h1>
                    </span>

                    <MdClose onClick={() => setShowPaymentModal(false)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-800 p-2 rounded-full ' size={25} />

                </div>



                {/* Direct Payment Method */}
                <div className='flex flex-col my-2 gap-2 p-2  border-b'>

                    <p className='text-xl mb-2 font-semibold font-poppins '>Choose Duration</p>


                    <span className='flex justify-between '>

                        <p className=' text-center font-medium  font-poppins'> Charge per minute</p>
                        <p className=' text-center font-medium  font-poppins'>1$ </p>
                    </span>
                    <span className='flex justify-between '>

                        <p className=' text-center font-medium  font-poppins'> Total</p>
                        <p className=' text-center font-medium  font-poppins'>{total} $ </p>
                    </span>
                    {/* Live Transcript Amount Inputs  */}
                    <span className='flex flex-row gap-2 my-1'>


                        <span className='flex flex-col justify-between items-start gap-1'>
                            <label className='text-center font-medium  font-poppins'>Amount of Minutes* </label>
                            <input type='number' value={minutes}
                                onChange={handleMinutesChange} className=' bg-bg-navy-blue  sfont-medium  font-poppins p-2 border border-white rounded-sm'></input>

                        </span>

                        <span className='flex flex-col justify-between items-start gap-1'>

                            <label className=' text-center font-medium  font-poppins'>Total* </label>
                            <input type='text' value={`${total}$`}
                                readOnly placeholder='20$' className='bg-bg-navy-blue  font-medium  font-poppins p-2 border border-white rounded-sm text-center' ></input>
                        </span>

                    </span>

                    <PaymentAdditionalInfo
                        promoCode={promoCode}
                        handlePromodeCodeChange={handlePromodeCodeChange}
                        onCurrencyChange={handleCurrencyChange}
                    />



                    <button onClick={handlePaymentOptions} className='text-center px-5 py-3 w-full h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-bg-purple mb-2 '><span className='flex items-center text-center justify-center gap-2'>
                            <MdPayment size={25} /> <p>Pay Now </p>
                        </span></button>

                </div>
            </div>
        </div>
    )
}

export default PaymentModal; 
