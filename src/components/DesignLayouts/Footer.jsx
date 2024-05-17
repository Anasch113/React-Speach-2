import React from 'react'
import apple from "../../../public/assets/icons/icon-app-apple.webp?url"




const Footer = () => {
  return (
    <footer className="bg-[#fbfbfb]">
        <div className="container mx-auto w-full p-10 py-6 lg:pt-28 pb-10">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0"><a className="" href="/">
                        <h4 className="mb-4 text-xl font-bold text-[#0f83d1]">Captify</h4>
                    </a>
                    <ul>
                        <li className="flex items-center gap-2 mb-4">
                            <picture><img src="/assets/icons/icon-app-apple.webp?url" alt=""
                                    className="w-4 h-4 object-contain" /></picture><a
                                className="text-xs font-normal text-gray-600 transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                href="/">Download from the App Store</a>
                        </li>
                        <li className="flex items-center gap-2 mb-4">
                        
                            <picture><img src="/assets/icons/icon-app-android.webp?url" alt="img"
                                    className="w-4 h-4 object-contain" /></picture><a
                                className="text-xs font-normal text-gray-600 transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                href="/">Download from Google Play</a>
                        </li>
                        <li className="flex items-center gap-2 mb-4">
                            <picture><img src="/assets/icons/app-logo.webp?url" alt="" className="w-4 h-4 object-contain" />
                            </picture><a
                                className="text-xs font-normal text-gray-600 transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                href="/">More download links</a>
                        </li>
                    </ul>
                    <div className="flex items-center gap-x-3 mt-6"><button
                            className="w-8 h-8 rounded-full flex justify-center items-center bg-[#0e76a8]">
                            <picture><img src="/assets/icons/linkedin.webp?url" alt="" className="w-4 h-4" /></picture>
                        </button><button className="w-8 h-8 rounded-full flex justify-center items-center bg-[#4468B1]">
                            <picture><img src="/assets/icons/facebook.webp?url" alt="" className="w-4 h-4" /></picture>
                        </button><button className="w-8 h-8 rounded-full flex justify-center items-center bg-[#429BD6]">
                            <picture><img src="/assets/icons/twitter.webp?url" alt="" className="w-4 h-4" /></picture>
                        </button><button className="w-8 h-8 rounded-full flex justify-center items-center bg-[#429BD6]">
                            <picture><img src="/assets/icons/instagram.webp?url" alt="" className="w-4 h-4" /></picture>
                        </button></div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase">OUR SOLUTIONS</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Remote Interpreting</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">AI Speech Translation</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Live Captions &amp; Subtitles</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Products Overview</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Integrations</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Book and Captioning</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase">About Us</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Why Us?</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="/about-us">About Us</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="/how-we-work">How we Work</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="/customer-stories">Customer Stories</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="/partners">Our Partners</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="/careers">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase">Resources</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Blog</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">News</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">eBooks &amp; Webinars</a></li>
                            <li className="mb-2"><a
                                    className="text-sm font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                                    href="">Knowledge Base</a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-2"><a
                                    className="text-base font-normal transition-all ease-linear duration-200 uppercase hover:text-[#0f83d1]"
                                    href="">Join Your Meeting</a></li>
                            <li className="mb-2"><a
                                    className="text-base font-normal transition-all ease-linear duration-200 uppercase hover:text-[#0f83d1]"
                                    href="">Join Mailing List</a></li>
                            <li className="mb-2"><a
                                    className="text-base font-normal transition-all ease-linear duration-200 uppercase hover:text-[#0f83d1]"
                                    href="">Contact us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center ga-10 mt-10 justify-center">
                <picture><img src="/assets/icons/unnamed.webp?url" className="w-20" alt="" /></picture>
                <picture><img src="/assets/icons/eta23_winner_badge.webp?url" className="w-40" alt="" /></picture>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between mt-20"><span
                    className="text-xs text-gray-500 sm:text-center">@2023 Interprefy. This site is protected by reCAPTCHA
                    and the Google Privacy Policy and Terms of Service apply.</span>
                <ul className="text-gray-500 font-medium flex gap-10 mt-4 sm:justify-center sm:mt-0">
                    <li className="mb-2"><a
                            className="text-xs font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                            href="">Term of Use</a></li>
                    <li className="mb-2"><a
                            className="text-xs font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                            href="">Privacy Policy</a></li>
                    <li className="mb-2"><a
                            className="text-xs font-normal transition-all ease-linear duration-200 hover:text-[#0f83d1]"
                            href="">Run a Speed Test</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
