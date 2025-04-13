import React from 'react'
import { MdOutlinePaid } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios'
import { useUserAuth } from '../../../context/UserAuthContext';
import { useAsyncValue } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PaymentAdditionalInfo from '@/components/SideComponents/PaymentAdditionalInfo';



const PaymentModal = ({

    total,
    setTotal,
    generateTranscript,
    initialMinutes,
    setInitialMinutes,
    setLanguage,
    language

}) => {




    const { user } = useUserAuth()

    const handleMinutesChange = (e) => {
        const value = e.target.value;
        setInitialMinutes(value);
        setTotal(value * 1 + 20);
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
        const userId = user.uid;
        const userEmail = user.email;
        const userName = user.displayName;
        const body = {
            total: total,
            userId: userId,
            minutes: initialMinutes,
            language: language,
            promoCode,
            currency,
            userEmail,
            userName
        }
        try {

            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/live-transcript-payment-casenote`, body);


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


    const handleValueChange = (value) => {
        setLanguage(value)
    }


    return (
        <>


            <Dialog>
                <DialogTrigger asChild>

                    <Button className="mx-2" variant={"purpleMeetingBtn"}>In-Person Meeting <FaPlay className='mx-2' /></Button>

                </DialogTrigger>
                <DialogContent className="md:max-w-[600px]  md:min-h-[400px] md:max-h-[580px] max-w-[300px]  overflow-y-auto  rounded-xl ">
                    <DialogHeader >
                        <DialogTitle className="mb-8">Billing</DialogTitle>
                        <DialogDescription>
                            <div className="my-5">

                            </div>
                            <div className='flex flex-col my-2 gap-2 p-2  border-b'>

                                <p className='text-xl mb-2  text-white font-semibold font-poppins '>Choose Duration for Meeting</p>


                                <span className='flex justify-between '>

                                    <p className=' text-center font-medium  font-poppins'> Charge per minute</p>
                                    <p className=' text-center font-medium  font-poppins'>1$ </p>
                                </span>
                                <span className='flex justify-between '>

                                    <p className=' text-center font-medium  font-poppins'>Your selected initialMinutes</p>
                                    <p className=' text-center font-medium  font-poppins'>{initialMinutes} </p>
                                </span>

                                <span className='flex justify-between '>

                                    <p className=' text-center font-medium  font-poppins'> Case Note</p>
                                    <p className=' text-center font-medium  font-poppins'>20$ </p>
                                </span>

                                <span className='flex justify-between '>

                                    <p className=' text-center font-medium  font-poppins'> Total</p>
                                    <p className=' text-center font-medium  font-poppins'>{total} $ </p>
                                </span>
                                {/* Live Transcript Amount Inputs  */}
                                <span className='flex flex-row gap-2 my-1'>


                                    <span className='flex flex-col justify-between items-start gap-1'>
                                        <label className='text-center font-medium  font-poppins'>Amount of Minutes* </label>
                                        <input type='number' value={initialMinutes}
                                            onChange={handleMinutesChange} className=' bg-bg-navy-blue  sfont-medium  font-poppins p-2 border border-white rounded-sm'></input>

                                    </span>

                                    <span className='flex flex-col justify-between items-start gap-1'>

                                        <label className=' text-center font-medium  font-poppins'>Total* </label>
                                        <input type='text' value={`${total}$`}
                                            readOnly placeholder='20$' className='bg-bg-navy-blue  font-medium  font-poppins p-2 border border-white rounded-sm text-center' ></input>
                                    </span>

                                </span>
                                <Select value={language} onValueChange={handleValueChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue className="text-white" placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en_us">American English</SelectItem>
                                        <SelectItem value="en_au">Australian English</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>

                            <PaymentAdditionalInfo
                                promoCode={promoCode}
                                handlePromodeCodeChange={handlePromodeCodeChange}
                                onCurrencyChange={handleCurrencyChange}
                            />


                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter >
                        <DialogClose asChild>
                            <button onClick={() => {
                                generateTranscript("notecase-credit")
                            }} className='text-center px-5 py-3 w-full  h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-bg-purple mb-2 '><span className='flex items-center text-center justify-center gap-2'>
                                    <MdPayment size={25} /> <p>Pay with Credit </p>
                                </span></button>

                        </DialogClose>
                        <DialogClose asChild>
                            <button onClick={handlePaymentOptions} className='text-center px-5 py-3 w-full  h-14
rounded-md bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-bg-purple mb-2 '><span className='flex items-center text-center justify-center gap-2'>
                                    <MdPayment size={25} /> <p>Direct Pay </p>
                                </span></button>

                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



        </>
    )
}

export default PaymentModal; 
