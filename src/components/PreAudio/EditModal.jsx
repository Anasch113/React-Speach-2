import React, { useState } from "react";
import { BsChatLeftText } from "react-icons/bs";
const EditModal = ({ selectedText, onClose, onUpdateText }) => {

    const [editedText, setEditedText] = useState(selectedText.text);

    const handleInputChange = (event) => {
        setEditedText(event.target.value);
    };

    const handleUpdate = () => {
        onUpdateText(editedText, selectedText.index);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">


            
            <div className="bg-blackGray p-4 md:w-[400px] w-2/3 rounded shadow-md">
                <div className="mb-4">
                    <h2 className="text-xl flex gap-3 items-center  font-semibold font-poppins">
                        <BsChatLeftText/>
                        Edit Text
                        </h2>
                    <textarea
                        className="w-full h-40 p-2 bg-bg-navy-blue border-2 border-blue-500 rounded"
                        value={editedText}
                        onChange={handleInputChange}z
                    />
                   
                </div>

                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={handleUpdate}>Update</button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>Cancel</button>
                </div>


            </div>
        </div>
    );
};

export default EditModal;
