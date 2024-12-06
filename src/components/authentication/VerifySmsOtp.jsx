import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VerifySmsOtp = ({ userId, isOtpSent, phoneNumber, setPhoneNumber, handleSmsMethod , setError}) => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()

    const { isMfaActive } = useSelector((state) => state.auth);


    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/sms/verify-code`, {
                userId,
                otp
            });

            console.log('Verification response:', response.data);
            toast.success("2 Factor Authentication Success")
            navigate("/home")
            
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError("Invalid or expired OTP")
        }
    };

    console.log("otp input", otp)

    return (

        <div>
           {
            isMfaActive === true && <p className='my-4'>Send the otp on {phoneNumber}</p>
           }
            {
                !isOtpSent && <div className='flex flex-col gap-5'>
                    <Input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter Your Phone Number"
                    />
                    <Button variant="customBlue" onClick={handleSmsMethod}>Send OTP</Button>
                </div>
            }

            {
                isOtpSent && <div className='flex flex-col gap-5'>
                    <Input
                        type="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                    <Button variant="customBlue" onClick={handleVerifyOtp}>Verify OTP</Button>
                    <p className='my-4'>Otp Sent to this phone number {phoneNumber}</p>
                </div>

                
            }



        </div>
    );
};

export default VerifySmsOtp;
