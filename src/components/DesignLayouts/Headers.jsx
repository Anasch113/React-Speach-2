import React from 'react'

const Headers = () => {
    return (
        <header className="bg-white fixed top-0 left-0 right-0 w-full shadow-sm z-50">
            <div className="max-w-screen-2xl mx-auto px-4 py-6 flex items-center justify-between"><a href="/"
                className="font-bold text-[#0f83d1] text-xl">Captify</a>
                <nav><button className="w-10 h-10 outline-none 2xl:hidden xl:hidden flex justify-center items-center"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-align-justify">
                    <line x1="3" x2="21" y1="6" y2="6"></line>
                    <line x1="3" x2="21" y1="12" y2="12"></line>
                    <line x1="3" x2="21" y1="18" y2="18"></line>
                </svg></button>
                    <ul className="2xl:flex xl:flex hidden items-center text-sm justify-center font-normal">
                        <li className="relative group px-6 py-2"><a
                            className="hover:text-[#0f83d1] py-1 hover:border-b-4 border-solid border-[#0f83d1] cursor-pointer"
                            href="">Solutions</a>
                            <div
                                className="absolute top-4 -right-80 w-full transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[1200px] transform">
                                <div className="relative top-6 p-0 bg-white rounded-xl shadow-xl w-full">
                                    <div className="relative z-10">
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="w-full pb-20 p-10 bg-[#fffaf5] rounded-bl-2xl">
                                                <p className="tracking-wider font-bold text-xl">Our solutions</p>
                                                <ul className="flex flex-col gap-3 mt-5 text-[15px]">
                                                    <li><a className="flex items-center gap-4 pl-0 p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/remote-simultaneous-interpretation">
                                                        <picture><img src="/assets/svg/1@svg.svg" className="w-10 h-10"
                                                            alt="" /></picture>Remote simultaneous interpretation
                                                    </a></li>
                                                    <li><a className="flex items-center gap-4 pl-0 p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/multilingual-live-captions-and-subtitles">
                                                        <picture><img src="/assets/svg/2@svg.svg" className="w-10 h-10"
                                                            alt="" /></picture>Live captions &amp; subtitles
                                                    </a></li>
                                                    <li><a className="flex items-center gap-4 pl-0 p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="">
                                                        <picture><img src="/assets/svg/3@svg.svg" className="w-10 h-10"
                                                            alt="" /></picture>Webinars &amp; ebooks
                                                    </a></li>
                                                    <li className="mt-8"><a
                                                        className="flex items-center p-2 mt -mx-2 text-base transition ease-in-out duration-300 text-[#0f83d1] font-normal hover:text-[#0f83d1]"
                                                        href="">Discover our products <svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            className="lucide lucide-arrow-up-right">
                                                            <path d="M7 7h10v10"></path>
                                                            <path d="M7 17 17 7"></path>
                                                        </svg></a></li>
                                                </ul>
                                            </div>
                                            <div className="w-full pb-20 p-10 rounded-bl-2xl">
                                                <p className="tracking-wider font-bold text-xl">Use cases</p>
                                                <ul className="flex flex-col gap-3 mt-5 text-[15px]">
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/in-person-hybird-events">In-person and hybrid
                                                        conferences</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/webinars-and-online-events">Webinars and virtual
                                                        events</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/town-halls">Trainings and townhalls</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/online-meetings">Online meetings​</a></li>
                                                    <li className="mt-8"><a
                                                        className="flex items-center p-2 mt -mx-2 text-base transition ease-in-out duration-300 text-[#0f83d1] font-normal hover:text-[#0f83d1]"
                                                        href="">Discover all use cases <svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            className="lucide lucide-arrow-up-right">
                                                            <path d="M7 7h10v10"></path>
                                                            <path d="M7 17 17 7"></path>
                                                        </svg></a></li>
                                                </ul>
                                            </div>
                                            <div className="w-full pb-20 p-7 rounded-br-2xl">
                                                <p className="tracking-wider font-bold text-xl">Integrations</p>
                                                <picture><img src="/assets/images/others/team.png"
                                                    className="w-full object-contain mt-7 h-60" alt="" /></picture><a
                                                        className="flex items-center p-2 mt -mx-2 text-base transition ease-in-out duration-300 text-[#0f83d1] font-normal hover:text-[#0f83d1]"
                                                        href="/integrations">Explore 80+ integrations<svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="lucide lucide-arrow-up-right">
                                                        <path d="M7 7h10v10"></path>
                                                        <path d="M7 17 17 7"></path>
                                                    </svg></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="relative group px-6 py-2"><a
                            className="hover:text-[#0f83d1] py-1 hover:border-b-4 border-solid border-[#0f83d1] cursor-pointer"
                            href="">Resources</a>
                            <div
                                className="absolute top-4 -right-80 w-full transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[1200px] transform">
                                <div className="relative top-6 p-0 bg-white rounded-xl shadow-xl w-full">
                                    <div className="relative z-10">
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="w-full pb-20 p-10 bg-[#fffaf5] rounded-bl-2xl">
                                                <p className="tracking-wider font-bold text-xl">News &amp; inspiration</p>
                                                <ul className="flex flex-col gap-3 mt-5 text-[15px]">
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="">Blog</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="">Company news</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="">Webinars &amp; ebooks</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="">Upcoming Captifyed events</a></li>
                                                </ul>
                                            </div>
                                            <div className="w-full pb-20 p-10 rounded-bl-2xl">
                                                <p className="tracking-wider font-bold text-xl">Help center</p>
                                                <ul className="flex flex-col gap-3 mt-5 text-[15px]">
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/faq">Frequently asked questions</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="https://knowledge.interprefy.com/">Knowledge based</a>
                                                    </li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/captify-training">Become an Captify-approved
                                                        interpreter</a></li>
                                                    <li className="mt-8"><a
                                                        className="flex items-center p-2 mt -mx-2 text-base transition ease-in-out duration-300 text-[#0f83d1] font-normal hover:text-[#0f83d1]"
                                                        href="/contact-us">Contact us <svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            className="lucide lucide-arrow-up-right">
                                                            <path d="M7 7h10v10"></path>
                                                            <path d="M7 17 17 7"></path>
                                                        </svg></a></li>
                                                </ul>
                                            </div>
                                            <div className="w-full pb-20 p-7 rounded-br-2xl">
                                                <p className="tracking-wider font-bold text-xl">How RSI works</p><a
                                                    className="flex items-center p-2 mt -mx-2 text-base transition ease-in-out duration-300 text-[#0f83d1] font-normal hover:text-[#0f83d1]"
                                                    href="">Guide to remote interpreting<svg
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        className="lucide lucide-arrow-up-right">
                                                        <path d="M7 7h10v10"></path>
                                                        <path d="M7 17 17 7"></path>
                                                    </svg></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="relative group px-6 py-2"><a
                            className="hover:text-[#0f83d1] py-1 hover:border-b-4 border-solid border-[#0f83d1] cursor-pointer"
                            href="">About</a>
                            <div
                                className="absolute top-4 -right-80 w-full transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[1200px] transform">
                                <div className="relative top-6 p-0 bg-white rounded-xl shadow-xl w-full">
                                    <div className="relative z-10">
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="w-full pb-20 p-10 bg-[#fffaf5] rounded-bl-2xl">
                                                <p className="tracking-wider font-bold text-xl">Company</p>
                                                <ul className="flex flex-col gap-3 mt-5 text-[15px]">
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/about-us">About us</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/our-mission">Our mission</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/meet-to-team">Meet the team</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/careers">Careers</a></li>
                                                </ul>
                                            </div>
                                            <div className="w-full pb-20 p-10 rounded-bl-2xl">
                                                <p className="tracking-wider font-bold text-xl">Our work</p>
                                                <ul className="flex flex-col gap-3 mt-5 text-[15px]">
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/why-captify">Why Captify?</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/how-we-work">How we work</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/partners">Partner network</a></li>
                                                    <li><a className="block p-2 -mx-2 text-base transition ease-in-out duration-300 text-gray-800 font-normal hover:text-[#0f83d1]"
                                                        href="/customer-stories">Customer stories</a></li>
                                                </ul>
                                            </div>
                                            <div className="w-full pb-20 p-7 rounded-br-2xl">
                                                <p className="tracking-wider font-bold text-xl">Why is Captify</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="relative group px-6 py-2"><a
                            className="hover:text-[#0f83d1] py-1 hover:border-b-4 border-solid border-[#0f83d1] cursor-pointer"
                            href="/pricing">Pricing</a></li>
                        <li className="relative group px-1 py-2"><a
                            className="py-4 px-6 rounded text-white bg-[#0f83d1] cursor-pointer" href="/login">Login</a>
                        </li>
                        <li className="relative group px-1 py-2"><a
                            className="py-4 px-6 rounded text-white bg-[#0f83d1] cursor-pointer" href="/signup">Sign up</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="progressMainWrapper">
        <div className="progressMainStyle" style={{width: "0%"}}></div>
    </div>
        </header>
    )
}

export default Headers
