import { Link, useLocation } from "react-router-dom";
import { RxCross1, RxDashboard, RxHamburgerMenu } from "react-icons/rx";

import { CgTranscript } from "react-icons/cg";
import { VscSync } from "react-icons/vsc";
import { MdOutlineSpatialAudioOff } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import user from "../../../assets/user.jpg"
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const isDashboardActive = location.pathname === "/dashboard";
    const isAudioTranscript = location.pathname === "/audio-transcript";
    const isLiveTranscript = location.pathname === "/live-transcript";
    const isResyncingAI = location.pathname === "/resyncing-ai";
    const handleLogout = () => {
        window.location.href = '/login';
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <section>
            <div className="flex flex-row">
                <div className="p-3 absolute cursor-pointer ">
                    {
                        isSidebarOpen ? <RxCross1 color="white" size={20} onClick={handleToggleSidebar} /> : <RxHamburgerMenu color="white" size={20} onClick={handleToggleSidebar} />
                    }

                </div>
                {
                    isSidebarOpen && (
                        <>
                            <aside className=" w-full  min-h-screen md:max-w-[250px] bg-[#1F2937]   md:block">
                                <Link to={'/account'}>
                                    <div className=" mt-10 w-full flex items-center justify-between px-3 pt-5">
                                        <p className="text-white font-normal text-lg">John Doe</p>
                                        <img src={user} alt="" className="w-[35px] h-[35px] rounded-full object-cover" />

                                    </div>

                                </Link>
                                <nav>
                                    <div className="w-full items-start text-[18px] font-[400]  flex gap-x-4 mt-2 pt-3 ">
                                        <li className="list-none w-full">
                                            <Link to="/dashboard" className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${isDashboardActive
                                                ? "bg-slate-300 text-black"
                                                : " text-white"
                                                }`} >

                                                <RxDashboard />
                                                <p

                                                >
                                                    Dashboard
                                                </p>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="w-full items-start text-[18px] font-[400]   flex gap-x-4 mt-2 ">
                                        <li className="list-none w-full">
                                            <Link to="/live-transcript" className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${isLiveTranscript ? "bg-slate-300 text-black" : " text-white"
                                                }`}>
                                                <CgTranscript />
                                                <p

                                                >
                                                    Live Transcript
                                                </p>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="w-full items-start text-[18px] font-[400]   flex gap-x-4 mt-2 ">
                                        <li className="list-none w-full">
                                            <Link to="/audio-transcript" className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${isAudioTranscript ? "bg-slate-300 text-black" : " text-white"
                                                }`}>
                                                <MdOutlineSpatialAudioOff />
                                                <p

                                                >
                                                    Audio Transcript
                                                </p>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="w-full items-start text-[18px] font-[400]   flex gap-x-4 mt-2 ">
                                        <li className="list-none w-full">
                                            <Link to="/resyncing-ai" className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${isResyncingAI ? "bg-slate-300 text-black" : " text-white"
                                                }`}>
                                                <VscSync />
                                                <p

                                                >
                                                    Resyncing AI
                                                </p>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="w-full items-start text-[18px] font-[400]   flex gap-x-4 mt-2 ">
                                        <li className="list-none w-full">
                                            <Link to="" onClick={handleLogout} className={`flex gap-x-4 mt-2 text-white items-center   px-5 w-full py-3`}>
                                                <SlLogout />
                                                <p

                                                >
                                                    Logout
                                                </p>
                                            </Link>
                                        </li>
                                    </div>
                                </nav>

                            </aside>
                        </>

                    )
                }

                <main className="w-full  ">{children}</main>
            </div>
        </section>

    );
};

export default DashboardLayout;
