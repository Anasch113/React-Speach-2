import React from 'react'
import { MdOutlinePaid } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios'

import { useAsyncValue } from 'react-router-dom';
import PaymentAdditionalInfo from '../SideComponents/PaymentAdditionalInfo';
const PaymentBox = ({
    handleCardPayment,
    fileName,
    setShowPaymentModal,
    handleFunctionRun,
    promoCode,
    handlePromodeCodeChange,
    handleCurrencyChange,
    featureName,
    price,
    filesCount
}) => {






    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 py-3">
            <div className="bg-bg-navy-blue min-h-[600px] w-[500px] p-5 rounded-xl overflow-y-auto overflow-x-hidden">
                <div>

                </div>

                <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                    <span className='flex flex-1  flex-row items-center gap-2'>
                        {/* <MdOutlinePaid className='text-2xl' /> */}
                        <h1 className='text-2xl font-semibold font-poppins '> Billing </h1>
                    </span>

                    <MdClose onClick={() => {
                        setShowPaymentModal(false)
                    }} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-800 p-2 rounded-full ' size={25} />

                </div>



                {/* Direct Payment Method */}
                <div className='flex flex-col my-2 gap-2 p-2  border-b '>




                    <span className='flex justify-between '>

                        <p className=' text-center font-medium  font-poppins'> {featureName}</p>
                        <p className=' text-center font-medium  font-poppins my-1'>{fileName}</p>
                    </span>
                    <span className='flex justify-between '>

                        <p className=' text-center font-medium  font-poppins'> Total</p>
                        {
                            featureName === 'Ocr Filename' ? 
                            
                            <p className=' text-center font-medium  font-poppins'>{price * filesCount}$ </p> :
                            
                            <p className=' text-center font-medium  font-poppins'>{price}$ </p>
                        }
                       
                    </span>
                    
                    <PaymentAdditionalInfo
                        promoCode={promoCode}
                        handlePromodeCodeChange={handlePromodeCodeChange}
                        onCurrencyChange={handleCurrencyChange}
                    />


                    <button onClick={handleFunctionRun} className='text-center px-5 py-3 w-full h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-bg-purple mb-2 '><span className='flex items-center text-center justify-center gap-2'>
                            <MdPayment size={25} /> <p>Pay with Credit </p>
                        </span></button>
                    <button onClick={handleCardPayment} className='text-center px-5 py-3 w-full h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-bg-purple mb-2 '><span className='flex items-center text-center justify-center gap-2'>
                            <MdPayment size={25} /> <p>Pay with Card </p>
                        </span></button>

                </div>
            </div>
        </div>
    )
}

export default PaymentBox; 
