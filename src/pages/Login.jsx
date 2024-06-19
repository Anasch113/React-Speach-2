import React, { useState } from 'react'
import Footer from '../components/DesignLayouts/Footer'
import Headers from '../components/DesignLayouts/Headers'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, user, signUpWithGoogle, signUpWithFaceBook, message } = useUserAuth();
  const navigate = useNavigate();





  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      await logIn(email, password);



      navigate("/home")




    } catch (err) {

      console.log("Error in signUp", err)

      if (err.code === "auth/invalid-credential") {
        toast.error("Invalid Crdentials, Please Try Again");
      } else {
        toast.error("Login falied, Please try later",);
      }

    }

    setEmail("");
    setPassword("")



  }


  const handleSignInWithGoogle = async () => {

    try {
      await signUpWithGoogle()
      toast.success("Login Successfully")
      navigate("/home");

    } catch (error) {
      console.log("Error while google signUp", error)
      toast.error("")
    }

  }


  const handleSignInWithFaceBook = async () => {

    try {
      await signUpWithFaceBook()
      toast.success("SignUp Successfully")
      navigate("/home");

    } catch (error) {
      console.log("Error while google facebook", error)
      toast.error("Google login failed. Please try later")
    }

  }



  return (
    <>
      <Headers />
      <div className="pt-20">
        <section className="bg-gray-50 ">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
              className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to
                  your account</h1>

                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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


                  <div>
                    <label htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      placeholder="Password"

                      className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5"
                      name="password"
                      required />

                  </div>


                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">

                        <input id="remember" aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />

                      </div>


                      <div className="ml-3 text-sm"><label htmlFor="remember"
                        className="text-gray-500 ">Remember me</label>

                      </div>
                    </div>


                    <a href="/forgetPassword"

                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                      password?</a>


                  </div>

                  {
                    message && message === "Email not verified. Verification email sent" && <p className=" bg-[#7dcfc0] font-medium text-white text-center rounded-md p-2">{message}</p>
                  }

                  <button disabled={message === "Email not verified. Verification email sent"} type="submit"
                    className="w-full text-white font-medium rounded text-sm px-5 py-2.5 text-center bg-blue-600">Sign
                    In</button>

                  <div className="mt-6">
                    <button
                      onClick={handleSignInWithGoogle}
                      type="button"
                      className="w-full flex items-center gap-2 justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-primary-black focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                      <img src="/google.png" alt="" className="w-6 h-6 object-contain" />
                      <p>Sign In with Google</p>
                    </button>
                    {/* <div className="mt-6">
                                        <button
                                            onClick={handleSignInWithFaceBook}
                                            type="button"
                                            className="w-full flex items-center gap-2 justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-primary-black focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                        >
                                            <img src="/facebook.png" alt="" className="w-6 h-6 object-contain" />
                                            <p>Sign In with FaceBook</p>
                                        </button>
                                        </div> */}

                  </div>

                  <p className="text-sm font-light flex items-center justify-center text-gray-500">Don’t have an
                    account yet?
                    <a
                      className="font-medium pl-2 text-primary-600 hover:underline dark:text-primary-500"
                      href="/signup">Sign up</a></p>

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

export default Login
