import React from 'react'
import { CiShare2 } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import toast from "react-hot-toast"
const ShareModal = ({ shareLink, isOpenEditModal, generateShareLink, setIsOpenEditModal }) => {


    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink)
          .then(() => {
            toast.success('Link copied to clipboard!');
          })
          .catch((error) => {
            console.error('Error copying link to clipboard: ', error);
          });
      };
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ">
            <div className="bg-white h-[300px] w-[500px] p-5 rounded-lg ">

                <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                    <span className='flex  flex-row items-center gap-2'>
                        <RiShareForwardLine className='text-2xl' />
                        <h1 className='text-2xl font-semibold font-poppins text-text-black'> Share Transcript</h1>
                    </span>

                    <MdClose onClick={() => setIsOpenEditModal(!isOpenEditModal)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-300 p-2 rounded-full ' size={25} />

                </div>



               

                    <div className='flex flex-col gap-1 p-2'>
                        <label className='font-medium text-text-black font-poppins text-sm' htmlFor="">Secure Link</label>
                        <input value={shareLink && shareLink} type="text" className='px-4 py-2 h-16 w-full border-blue-500 border-2  rounded-sm outline-none text-lg text-text-black' />
                    </div>


                

                <button onClick={handleCopy} className='text-center px-5 py-3 w-full h-14
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                        <MdOutlineContentCopy size={25} /> <p>Copy Link </p>
                    </span></button>
            </div>
        </div>
    )
}

export default ShareModal
