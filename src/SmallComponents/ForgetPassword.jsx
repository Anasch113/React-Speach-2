import React, { useState } from 'react'
import Headers from '../components/DesignLayouts/Headers'
import Footer from '../components/DesignLayouts/Footer'
import toast from 'react-hot-toast'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from "firebase/auth"
import Swal from 'sweetalert2';
import { useUserAuth } from '../context/UserAuthContext'
const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const { logOut} = useUserAuth();


    const handleResetPassword =  async(e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            
            Swal.fire("Email Sent for Reset Password", "Check your Inbox", "success")
            await logOut();
           
        } catch (error) {
            toast.error("Error sending while reset email")
            console.log("Error occurred ", error)
        }
        
    }
    return (
        <>
            <Headers />
            <div className="">
                <section className="bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Reset Your Password</h1>

                                <form className="space-y-4 md:space-y-6" onSubmit={handleResetPassword}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email
                                            address</label>

                                        <input value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            id="email"
                                            className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5"
                                            placeholder="Email address"
                                            name="email"
                                            required />

                                    </div>


                                    <button type="submit"
                                        className="w-full text-white font-medium rounded text-sm px-5 py-2.5 text-center bg-blue-600">
                                        Send Email
                                    </button>



                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default ForgetPassword
