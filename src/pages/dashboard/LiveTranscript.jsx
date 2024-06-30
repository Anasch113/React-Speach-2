import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboard-layout/DashboardLayout';
import { IoMdSettings } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { MdDashboard, MdOutlineFilterCenterFocus, MdPushPin } from "react-icons/md";
const LiveTranscript = () => {
    const [showLiveTranscription, setShowLiveTranscription] = useState(false);

    const handleMeetingClick = () => {
        setShowLiveTranscription(true);
    };

    const handleGetOut = () => {
        setShowLiveTranscription(false);
    };

    return (
        <DashboardLayout>
            {showLiveTranscription ? (
                <div className="min-h-screen bg-black text-white p-6 text-[16px] mx-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-[#460073] p-4 rounded-md shadow-md ">
                        <h1 className="md:text-2xl text-xl font-bold">Live Transcript</h1>
                        <button className="md:ml-auto bg-red-600 py-2 px-3 rounded-md hover:bg-red-700 mt-8 md:mt-0 mx-10 md:mx-0" onClick={handleGetOut}>Stop Live Transcription</button>
                    </div>
                    <div className="bg-gray-900 text-white p-6 rounded-md shadow-md max-w-md w-full mt-6 mx-auto hidden">
                        <h2 className="text-xl font-bold mb-4">You want Live Transcript for</h2>
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <Link to="/auth/userDashboard">
                                <button className="bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-600 w-full mb-5 md:mb-0">Online Meeting</button>
                            </Link>
                            <Link to="/auth/userDashboard">
                                <button className="bg-green-500 py-2 px-3 rounded-md hover:bg-green-600 w-full mb-5 md:mb-0">Physical Meeting</button>
                            </Link>
                            <button className="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                    <div className="min-h-screen bg-black mt-10">
                        <header className="bg-gray-900 text-white flex justify-between items-center p-4">
                            <h1 className="text-blue-400 text-xl font-bold">Captify</h1>
                            <div className="flex space-x-4">
                                <IoMdSettings size={20} className='cursor-pointer'/>
                                <FaHome size={20} className='cursor-pointer' />
                                <MdDashboard size={20} className='cursor-pointer'/>
                            </div>
                        </header>
                        <main className="p-4 bg-black">
                            <div className="bg-black shadow rounded">
                                <div className="flex justify-between items-center border-b p-4">
                                    <h2 className="font-semibold text-[#460073]">StreamBox</h2>
                                    <div className="flex space-x-2">
                                        <div className='border rounded-md border-[#460073] w-[25px] h-[25px] flex justify-center items-center'>
                                            <MdOutlineFilterCenterFocus className='cursor-pointer' color='#460073' size={18} />

                                        </div>
                                        <div className='border rounded-md border-[#460073] w-[25px] h-[25px] flex justify-center items-center'>
                                            <MdPushPin className='cursor-pointer' color='#460073' size={18}/>

                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 h-96"></div>
                                <div className="border-t py-2 px-3 flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        {/* Icons */}
                                    </div>
                                    <div className="flex space-x-2"></div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            ) : (
                <div className="w-full px-5 md:px-20 pt-5 ">
                    <div className="bg-[#460073] rounded-lg w-full py-1 px-7">
                        <h1 className="text-white">Live Transcript</h1>
                    </div>
                    <div className="bg-gray-900 text-white p-6 rounded-md shadow-md max-w-[500px] w-full mt-6 mx-auto">
                        <h2 className="text-xl font-bold mb-4">You want Live Transcript for</h2>
                        <div className="flex flex-col gap-2 md:flex-row justify-between mt-7 mb-4">
                            <button onClick={handleMeetingClick} className="bg-blue-600 py-2 px-[10px] rounded-md hover:bg-blue-600 w-full mb-5 md:mb-0">Online Meeting</button>
                            <button onClick={handleMeetingClick} className="bg-green-600 py-2 px-[10px] rounded-md hover:bg-green-600 w-full mb-5 md:mb-0">Physical Meeting</button>
                            <button className="bg-gray-600 py-2 px-[10px] rounded-md hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default LiveTranscript;
