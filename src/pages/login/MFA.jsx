import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { useUserAuth } from '@/context/UserAuthContext'
import axios from "axios"
import VerifyTOTP from '@/components/authentication/VerifyTOTP '
import VerifySmsOtp from '@/components/authentication/VerifySmsOtp'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthHook } from '@/GlobalState/customHooks/useAuthHook'


const MFA = () => {

  const { user } = useUserAuth()
  const userId = user.uid
  const [qrCode, setQrCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [smsModelShow, setSmsModelShow] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();



  const searchParams = new URLSearchParams(location.search);
  const method = searchParams.get('method')
  const { checkMfaActive } = useAuthHook()
  console.log("method", method)


  useEffect(() => {
    const fetchMfaData = async () => {
      try {
        if (method === 'qr') {
          handleQrMethod();
        } else if (method === 'sms') {
          const mfaData = await checkMfaActive(); // Await the promise
          console.log("MFA data in MFA component:", mfaData);

          if (mfaData?.isMfaActive === true) {
            setPhoneNumber(mfaData.phoneNumber);
          }

          setSmsModelShow(true);
        }
      } catch (error) {
        console.error("Error in MFA useEffect:", error);
        setError("Some Error occurred, Please try again later")
      }
    };

    fetchMfaData(); // Call the async function
  }, [method]);



  const handleQrMethod = async () => {
    try {


      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/qr/setup-totp`, { userId: user.uid }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = response.data
      setQrCode(data.qrCodeImage);
      console.log("data:", data)
    } catch (error) {
      console.log("error", error)
      setError("Failed to set up TOTP")
    }
  }




  const handleSmsMethod = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/sms/send-code`, {
        userId: userId,
        phoneNumber: phoneNumber // Make sure the phone number is available
      });

      setIsOtpSent(true)
      console.log('SMS OTP sent:', response.data);
    } catch (error) {
      console.error('Error sending SMS OTP:', error);
      setError("Error sending SMS OTP")
    }
  };

  console.log("phone number input", phoneNumber)


  // Step 2: Handle successful TOTP verification
  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };
  return (
    <div className="min-h-screen w-full flex flex-col p-4 items-center justify-center gap-5">
      <h1 className="normal-title">2-Factor Authentication</h1>

      {!isVerified ? (
        <div className="flex flex-col gap-4 p-5 border items-center">
          {/* Step 1: Display QR Code */}
          {!qrCode && !smsModelShow &&

            <div className='flex flex-col gap-4 p-4'>

              <p>Enable 2FA to enhance your account security.</p>
              <Button onClick={handleQrMethod} variant="customBlue">
                Enable QR Code Method
              </Button>

              <Button onClick={() => {
                setSmsModelShow(true)
              }} variant="customPurple">
                Enable SMS Authentication
              </Button>

             
            </div>
          }

          {
            qrCode && <div className="flex items-center">

              {/* Step 2: Verify TOTP */}
              <VerifyTOTP qrCode={qrCode} userId={userId} onSuccess={handleVerificationSuccess}  setError = {setError}/>
            </div>
          }

          {
            smsModelShow &&

            <VerifySmsOtp

              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              handleSmsMethod={handleSmsMethod}
              userId={userId}
              isOtpSent={isOtpSent}
              setError ={ setError}

            />
          }


        </div>
      ) : (
        <div className="text-green-500">
          <h2>2FA Enabled Successfully!</h2>
          <p>You’ve successfully set up 2FA for your account.</p>
          {/* <Button onClick={() => navigate('/home')} variant="customBlue">
            Go to Home
          </Button> */}
        </div>
      )}
       {error && <p className="text-red-500">{error}</p>}
    </div>

  );


}

export default MFA
