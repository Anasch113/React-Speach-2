import React, { useState } from 'react';

import axios from 'axios';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyTOTP = ({ userId, onSuccess, qrCode, setError }) => {
  const [totp, setTotp] = useState('');

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate()
  const handleVerify = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/auth/qr/verify-totp`,
        { userId: userId, token: totp },
        { headers: { 'Content-Type': 'application/json' } }
      );


     
     
      toast.success("2 Factor Authentication Success")
      navigate("/home")



    } catch (err) {
      console.error('Verification error:', err);
      setError('An error occurred, please try again.');

    }
    setIsLoading(false)
  };
  console.log("totp code:", success)

 
  return (
    <div className="flex flex-col items-center gap-3">

      <p>Scan the QR Code with your authenticator app:</p>
      <img src={qrCode} alt="QR Code" className="mt-4 w-48 h-48" />
      <p>Enter the code from your app below to verify:</p>

      <span className='flex gap-2 items-center'>

        <Input
          type="text"
          value={totp}
          onChange={(e) => setTotp(e.target.value)}
          placeholder="Enter TOTP"
        />
        {
          isLoading && <div className='spinner'></div>
        }
      </span>

      <Button onClick={handleVerify} variant="customBlue">
        Verify TOTP
      </Button>
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </div>
  );
};

export default VerifyTOTP;
