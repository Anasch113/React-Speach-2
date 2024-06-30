import { Link, useLocation } from "react-router-dom";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { MdPayments } from "react-icons/md";

import { useState } from "react";
// eslint-disable-next-line react/prop-types
const UserDashboard = ({ children }) => {
  const location = useLocation();
  const isDashboardActive = location.pathname === "/account";
  const isLiveTranscript = location.pathname === "/security-settings";
  const isAudioTranscript = location.pathname === "/payment-billing-info";

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <section>
      <div className="flex flex-row">
        <div className="p-3 absolute cursor-pointer ">
          {isSidebarOpen ? (
            <RxCross1 color="white" size={20} onClick={handleToggleSidebar} />
          ) : (
            <RxHamburgerMenu
              color="white"
              size={20}
              onClick={handleToggleSidebar}
            />
          )}
        </div>
        {isSidebarOpen && (
          <>
            <aside className=" w-full min-h-screen md:max-w-[280px] bg-[#1F2937]   md:block">
              <div className=" mt-10 w-full flex items-center justify-between px-3 pt-5">
                <p className="text-white font-normal text-lg">Profile</p>
              </div>
              <nav>
                <div className="w-full items-start text-[18px] font-[400]  flex gap-x-4 mt-2 pt-3 ">
                  <li className="list-none w-full">
                    <Link
                      to="/account"
                      className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${
                        isDashboardActive
                          ? "bg-slate-300 text-black"
                          : " text-white"
                      }`}
                    >
                      <VscAccount />
                      <p>Account</p>
                    </Link>
                  </li>
                </div>
                <div className="w-full items-start text-[18px] font-[400]   flex gap-x-4 mt-2 ">
                  <li className="list-none w-full">
                    <Link
                      to="/security-settings"
                      className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${
                        isLiveTranscript
                          ? "bg-slate-300 text-black"
                          : " text-white"
                      }`}
                    >
                      <IoSettingsOutline />
                      <p>Security Settings</p>
                    </Link>
                  </li>
                </div>
                <div className="w-full items-start text-[18px] font-[400]   flex gap-x-4 mt-2 ">
                  <li className="list-none w-full">
                    <Link
                      to="/payment-billing-info"
                      className={`flex gap-x-4 mt-2 items-center   px-5 w-full py-3 ${
                        isAudioTranscript
                          ? "bg-slate-300 text-black"
                          : " text-white"
                      }`}
                    >
                      <MdPayments />
                      <p>Payment & Billing Info</p>
                    </Link>
                  </li>
                </div>
              </nav>
            </aside>
          </>
        )}

        <main className="w-full  ">{children}</main>
      </div>
    </section>
  );
};

export default UserDashboard;
