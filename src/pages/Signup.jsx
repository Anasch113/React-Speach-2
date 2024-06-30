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
import axios from "axios"
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";


const Signup = () => {




    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { signUp, signUpWithGoogle, signUpWithFaceBook } = useUserAuth()
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        toast.success("Processing...")


        try {


            console.log("email , password, name", email, password, name)

            const body = {
                email: email,
                password: password,
                name: name
            }
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/emails/signup`, body);

            console.log("response from backend on signup, ", response.data)

            if (response.data.message === 'User signed up. Verification email sent.') {



                toast.success(response.data.message)

                // navigate("/emailverification")
                setMessage("Verification link sent to your email. Please check your inbox and click on  the link to verify")
                setDisabled(true)
            }









        } catch (err) {

            console.log("Error in signUp", err.response.data.error.code)
            if (err.response.data.error.code === "auth/weak-password") {
                toast.error("Weak Password", "Please choose a stronger password.", "error");
            } else if (err.response.data.error.code === "auth/email-already-exists") {
                toast.error("User Already Exists", "This email is already registered.", "error");
            } else {
                toast.error("Something went wrong, please try later",);
            }

        }

        setEmail("");
        setPassword("")
        setConfirmPassword("")
        setName("")


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
            <div className="flex justify-center min-h-screen items-center mx-5 md:mx-0">
                <div className="border border-[#460073] rounded-lg shadow-md md:w-[500px] md:h-[560px]">
                    <h1 className="font-bold text-center pt-5 md:text-3xl text-[#460073]">
                        User Sign up
                    </h1>
                    <form onSubmit={handleSignup} className="mx-4 md:mx-10">
                        <label className="flex items-center gap-2 mt-10 border rounded-lg p-2 shadow-sm">
                            <FaRegUser color="white" className="opacity-90 mx-1" />
                            <input value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="grow text-white appearance-none h-8 px-1 text-base leading-6 border border-transparent rounded-lg bg-opacity-100 bg-[var(--fallback-b1,oklch(var(--b1)/1))] focus:outline-none "
                                placeholder="Name"
                                name="name"
                                required />
                        </label>
                        <label className="flex items-center gap-2 mt-3 border rounded-lg p-2 shadow-sm">
                            <HiOutlineMail color="white" className="opacity-90 mx-1" />
                            <input value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="grow  text-white appearance-none h-8 px-1 text-base leading-6 border border-transparent rounded-lg bg-opacity-100 bg-[var(--fallback-b1,oklch(var(--b1)/1))] focus:outline-none "
                                placeholder="Email address"
                                name="email"
                                required />
                        </label>
                        <label className="flex items-center gap-2 mt-3 border rounded-lg p-2 shadow-sm">
                            <IoKeyOutline color="white" className="opacity-90 mx-1" />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="grow text-white appearance-none h-8 px-1 text-base leading-6 border border-transparent rounded-lg bg-opacity-100 bg-[var(--fallback-b1,oklch(var(--b1)/1))] focus:outline-none "
                                name="password"
                                required />
                        </label>
                        <label className="flex items-center gap-2 mt-3 border rounded-lg p-2 shadow-sm">
                            <IoKeyOutline color="white" className="opacity-90 mx-1" />
                            <input
                                type="password" id="confirm-password" placeholder="Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="grow text-white appearance-none h-8 px-1 text-base leading-6 border border-transparent rounded-lg bg-opacity-100 bg-[var(--fallback-b1,oklch(var(--b1)/1))] focus:outline-none "
                                name="confirm-password" />
                        </label>
                        <div className=" mt-3 text-white">
                            <span>Already have an account? <a className="hover-underline-animation hover:opacity-70" href="/login">Login</a></span>
                        </div>

                        {
                            message && <p className=" bg-[#7dcfc0] font-medium text-white text-center rounded-md p-2">{message}</p>
                        }


                        <button disabled={disabled} type="submit"
                            className="customBtn1 w-full mt-8 py-2 px-4 rounded-lg bg-[#460073] text-white hover:bg-opacity-90">Create
                            an account</button>
                    </form>
                    <div className="text-center  text-xs my-3 text-white">
                        <p>Or</p>
                    </div>
                    <div className="mx-4 md:mx-10">
                        <button type="button" onClick={handleSignInWithGoogle} className="w-full my-3 bg-[#353434] text-white py-2 px-4 rounded hover:bg-gray-600 flex items-center justify-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="24"
                                height="24"
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.22 0 5.17 1.38 6.35 2.55l4.61-4.61C31.37 4.91 28.09 3 24 3 17.73 3 12.46 6.9 10.05 12.02l5.39 4.19C16.9 12.62 20.19 9.5 24 9.5z"
                                ></path>
                                <path
                                    fill="#4285F4"
                                    d="M46.16 24.5c0-1.36-.12-2.72-.36-4.05H24v7.66h12.61c-.55 2.96-2.21 5.45-4.73 7.11l5.39 4.19c3.12-2.88 5.45-7.1 5.45-14.91z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M10.05 24c0-1.58.27-3.1.75-4.51l-5.39-4.19C3.83 18.26 3 21.05 3 24s.83 5.74 2.41 8.7l5.39-4.19c-.48-1.41-.75-2.93-.75-4.51z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M24 46c4.09 0 7.62-1.35 10.16-3.65l-5.39-4.19c-1.49 1.01-3.37 1.62-5.77 1.62-3.81 0-7.09-2.9-8.25-6.85l-5.39 4.19C12.46 41.1 17.73 46 24 46z"
                                ></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                            Continue with Google
                        </button>
                        {/* <button type="button" className="w-full my-3 bg-[#353434] text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="24"
                                height="24"
                            >
                                <path
                                    fill="#3B5998"
                                    d="M24 4C12.95 4 4 12.95 4 24c0 9.85 7.36 18 17 19.7v-13.9h-5.13v-5.8H21V21.1c0-5.12 3.1-7.9 7.62-7.9 2.18 0 4.04.16 4.59.23v5.32h-3.15c-2.47 0-2.95 1.18-2.95 2.9v3.8H33.5l-.89 5.8H27.1v13.9c9.64-1.7 17-9.85 17-19.7 0-11.05-8.95-20-20-20z"
                                ></path>
                            </svg>
                            Continue with Facebook
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
