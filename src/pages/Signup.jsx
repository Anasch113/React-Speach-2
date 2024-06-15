import React, { useEffect, useState } from 'react'
import Headers from '../components/DesignLayouts/Headers'
import Footer from '../components/DesignLayouts/Footer'
import { useUserAuth } from '../context/UserAuthContext'
import { useDispatch } from "react-redux"
import { auth } from "../firebase"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth'


const Signup = () => {




    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { signUp, signUpWithGoogle, signUpWithFaceBook } = useUserAuth()
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        try {

            await signUp(email, password, name);
            updateProfile(auth.currentUser, { displayName: name })

            Swal.fire("Verification Email Sent", "Check your Inbox", "success")
            navigate("/emailverification")



        } catch (err) {

            console.log("Error in signUp", err)

            if (err.code === "auth/weak-password") {
                toast.error("Weak Password", "Please choose a stronger password.", "error");
            } else if (err.code === "auth/email-already-in-use") {
                toast.error("User Already Exists", "This email is already registered.", "error");
            } else {
                toast.error("Please fill up all fields",);
            }
        }

        setEmail("");
        setPassword("")
        setConfirmPassword("")


    }


    const handleSignInWithGoogle = async () => {

        try {
            await signUpWithGoogle()
            toast.success("SignUp Successfully")
            navigate("/home");

        } catch (error) {
            console.log("Error while google signUp", error)
            toast.error("Google SignUp failed. Please try later")
        }

    }


    const handleSignInWithFaceBook = async () => {

        try {
            await signUpWithFaceBook()
            toast.success("SignUp Successfully")
            navigate("/home");

        } catch (error) {
            console.log("Error while google facebook", error)
        }

    }


    return (
        <>
            <Headers />

           
                
                    <div className="  flex flex-col items-center justify-center px-6 py-10 md:min-h-screen  bg-gray-50-50 ">
                        
                        <div
                            className="w-full mt-20 bg-white  rounded-lg shadow dark:border sm:max-w-md ">

                            <div className="p-6 h-full space-y-4 md:space-y-6 sm:p-8 ">
                                
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create and
                                    account</h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>

                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>

                                        <input value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            id="name"
                                            className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded w-full p-2.5"
                                            placeholder="Name"
                                            name="name"
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email
                                            address</label>

                                        <input value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            id="email"
                                            className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded w-full p-2.5"
                                            placeholder="Email address"
                                            name="email"
                                            required />
                                    </div>


                                    <div>
                                        <label htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900">Password</label>

                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded w-full p-2.5"
                                            name="password"
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password"
                                            className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>

                                        <input
                                            type="password" id="confirm-password" placeholder="Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded w-full p-2.5"
                                            name="confirm-password" />
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms"
                                                aria-describedby="terms"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded outline-none focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required />
                                        </div>

                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms"
                                                className="font-light text-gray-500 ">I accept the
                                                <a
                                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                    href="#">Terms and Conditions</a>

                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit"
                                        className="w-full text-white font-medium rounded text-sm px-5 py-2.5 text-center bg-blue-600">Create
                                        an account</button>
                                    <div className="mt-6">
                                        <button
                                            onClick={handleSignInWithGoogle}
                                            type="button"
                                            className="w-full flex items-center gap-2 justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-primary-black focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                        >
                                            <img src="/google.png" alt="" className="w-6 h-6 object-contain" />
                                            <p>Sign up with Google</p>
                                        </button>
                                        {/* <div className="mt-6">
                                        <button
                                            onClick={handleSignInWithFaceBook}
                                            type="button"
                                            className="w-full flex items-center gap-2 justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-primary-black focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                        >
                                            <img src="/facebook.png" alt="" className="w-6 h-6 object-contain" />
                                            <p>Sign up with FaceBook</p>
                                        </button>
                                        </div> */}
                                        
                                    </div>


                                    <p className="text-sm font-light text-gray-500 flex items-center justify-center">Already have an
                                        account? <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500 mx-1"
                                            href="/login">Login here</a></p>

                                </form>
                            </div>
                        </div>
                    </div>
                
            
            <Footer />
        </>
    )
}

export default Signup
