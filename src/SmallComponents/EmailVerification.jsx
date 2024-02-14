import React from 'react'

const EmailVerification = () => {
  return (
    <div className="">
    <section className=" ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Verify Your Email</h1>


            <div className='flex items-center flex-col justify-center p-1 gap-3'>
              <p className='text-gray-500  '>The Verification Email has been sent to your Email. Please verify it before Login  </p>
              <img className='w-14' src="/assets/icons/check.png" alt="" />
            </div>

            <form className="space-y-4 md:space-y-6" >
             
              <a href='/login' type="submit"
                className="w-full text-white font-medium rounded text-sm px-5 py-2.5 text-center bg-blue-600">Login Now</a>

              

            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default EmailVerification
