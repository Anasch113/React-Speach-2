import React from 'react'
import { CiShare2 } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import toast from "react-hot-toast"
import { RiDeleteBin6Line } from "react-icons/ri";
const DeleteModal = ({ deleteTranscript, setShowDeleteModal, filename}) => {


   
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ">
            <div className="bg-black h-[270px] w-[500px] p-5 rounded-lg ">

                <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                    <span className='flex  flex-row items-center gap-2'>
                        <RiDeleteBin6Line className='text-2xl' />
                        <h1 className='text-2xl font-semibold font-poppins '> Delete Transcript</h1>
                    </span>

                    <MdClose onClick={() => setShowDeleteModal(false)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-900 p-2 rounded-full ' size={25} />

                </div>



               

                    <div className='flex flex-col my-2 gap-1 p-2'>
                       <p className=' text-center font-medium  font-poppins'>Are you sure want to delete <span className='font-bold'>{filename}</span></p>
                       <p className=' text-center font-medium  font-poppins'>This can't be undone</p>
                    </div>


                

                <button onClick={deleteTranscript} className='text-center px-5 py-3 w-full h-14
rounded-md bg-red-400 text-white text-xl font-medium font-roboto hover:bg-red-500 '><span className='flex items-center text-center justify-center gap-2'>
                        <RiDeleteBin6Line size={25} /> <p>Delete </p>
                    </span></button>
            </div>
        </div>
    )
}

export default DeleteModal
