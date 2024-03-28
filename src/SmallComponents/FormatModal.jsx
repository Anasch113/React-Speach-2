import React from 'react'


const FormatModal = ({
    showFormatModal,
    selectedFormat,
    handleContinue,
    isDefault,
    toggleModal,
    handleFormatChange,
    handleSetDefaultChange
}) => {
  return (
    <div>
       {showFormatModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white py-6 px-8 rounded-lg">
                        <h2 className="text-xl font-semibold font-poppins mb-4">Select Transcriptions Format</h2>
                        <div className="flex flex-col gap-3">
                            <div className="mb-4 flex flex-col gap-4 items-start">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio w-4 h-4"
                                        name="format"
                                        value="standard"
                                        checked={selectedFormat === 'standard'}
                                        onChange={() => handleFormatChange('standard')}
                                    />
                                    <span className="ml-2 font-medium">Standard</span>
                                </label>
                                <label className="inline-flex items-center ">
                                    <input
                                        type="radio"
                                        className="form-radio w-4 h-4"
                                        name="format"
                                        value="SRT"

                                        checked={selectedFormat === 'SRT'}
                                        onChange={() => handleFormatChange('SRT')}
                                    />
                                    <span className="ml-2">SRT</span>
                                </label>
                                
                               
                            </div>
                           
                            <div className="flex ">
                                <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md mr-4"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-bg-blue text-white px-4 py-2 rounded-md"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

    </div>
  )
}

export default FormatModal
