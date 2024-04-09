import React from 'react'

const ShareModal = ({shareLink}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-4 w-[400px] rounded shadow-md">
        <div className="mb-4">
            <h2 className="text-xl flex gap-3 items-center  font-semibold font-poppins text-text-black">
                
               Copy Link
                </h2>
            <textarea
                className="w-full h-40 p-2 border-2 border-blue-500 rounded"
               
            />
           
        </div>
        <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" >{shareLink}</button>
      
        </div>
    </div>
</div>
  )
}

export default ShareModal
