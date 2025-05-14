import React from 'react'
import uploadImage from '../../assets/download.png'
import { useNavigate } from 'react-router-dom'
const OcrInfo = () => {
    const navigate = useNavigate()
    return (
        <div className="max-w-screen-xl mx-auto md:p-0 p-3 mt-10">
            <section className="flex items-center justify-between w-full md:flex-row flex-col">
                <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                    <div className="text-3xl font-bold text-center md:text-left">
                        OCR - Image To Text with Captifylive.online
                    </div>
                    <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                        Upload handwritten notes or scanned pages. Use Captify.live to convert these to clean, editable digital text—ideal for typed affidavits, client notes or evidence logs. No more retyping! Ask for a free trial today.

                    </p>
                    <button onClick={() => {
                        navigate("/contact-us")
                    }} className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white">
                        Contact
                    </button>
                </div>
                <img src={uploadImage} alt="Upload" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-bottom object-cover" />
            </section>
        </div>
    )
}

export default OcrInfo
