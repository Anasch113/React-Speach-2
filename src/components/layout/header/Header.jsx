import { useState, useRef, useEffect } from 'react';
import logo from "../../../assets/logo.png";
import "./header.styles.css";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaBars } from 'react-icons/fa6';
import { useUserAuth } from '../../../context/UserAuthContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../../../layout/Sidebar"

const Header = () => {
    const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);
    const [isWhatWeAreOpen, setIsWhatWeAreOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const whatWeDoRef = useRef(null);
    const whatWeAreRef = useRef(null);

    const navigate = useNavigate();
    const { user, logOut } = useUserAuth();


    const handleLogout = async () => {
        await logOut()
        navigate('/login')
    }

    const toggleWhatWeDoDropdown = () => {
        setIsWhatWeDoOpen(prevState => !prevState);
        if (isWhatWeAreOpen) {
            setIsWhatWeAreOpen(false);
        }
    };

    const toggleWhatWeAreDropdown = () => {
        setIsWhatWeAreOpen(prevState => !prevState);
        if (isWhatWeDoOpen) {
            setIsWhatWeDoOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        if (whatWeDoRef.current && !whatWeDoRef.current.contains(event.target)) {
            setIsWhatWeDoOpen(false);
        }
        if (whatWeAreRef.current && !whatWeAreRef.current.contains(event.target)) {
            setIsWhatWeAreOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const legalServices = [
        { label: 'Legal Videography', link: '/Legal-videography' },
        { label: 'Court Reporting', link: '/court-reporting' },
        { label: 'Transcript Summarization', link: '/transcript-summarization' },
        { label: 'File Note', link: '/file-note' },
        { label: 'Audio Transcription', link: '/audio-transcription' },
        { label: 'Handwriting Converter ', link: '/ocr' },

    ];

    const corporateGovernmentServices = [
        { label: 'Human Live Stenocaptioning (CART)', link: '/human-live-stenocaptioning' },
        { label: 'AI Live Captioning', link: '/ai-live-captioning' },
        { label: 'Audio Transcription', link: '/corporate-audio-transcription' },
        { label: 'Resync AI', link: '/resync-ai' },
        // { label: 'Meeting Note', link: '/meeting-note' },
        // { label: 'Transcript Summarization', link: '/corporate-transcript-summarization' },
        // Add more corporate & government services here...
    ];

    const whatWeDo = [
        {
            label: 'Legal Videography',
            link: '/Legal-videography'
        },
        {
            label: 'Court Reporting',
            link: '/court-reporting'
        },
        {
            label: 'Transcript Summarization',
            link: '/Transcript-summarization'
        },
        {
            label: 'File Note',
            link: '/file-note'
        },
        {
            label: 'Audio Transcription',
            link: '/audio-transcription'
        },
        {
            label: 'Human Live Stenocaptioning (CART)',
            link: '/human-live-stenocaptioning'
        },
        {
            label: 'AI Live Captioning',
            link: '/ai-live-captioning'
        },
        {
            label: 'Audio Transcription',
            link: '/audio-transcription'
        },
        {
            label: 'Resync AI',
            link: '/resync-ai'
        },
        {
            label: 'Meeting Note',
            link: '/meeting-note'
        },
        {
            label: 'Transript Summarization',
            link: '/corporate-transcript-summarization'
        },


    ];
    const whatWeAre = [
        {
            label: 'Jason Bradley',
            link: '/',
        },
        {
            label: 'Helen Lubke',
            link: '/',
        },
        {
            label: 'Samuel Bradley',
            link: '/',
        },
        {
            label: 'Sharny Leung',
            link: '/',
        },
    ];


    return (
        <div className="max-h-[120px] pb-9 bg-black text-white">

            <div className="w-full flex justify-between items-center relative">
                {/* logo  */}
                <a href="/" className="custom__logo md:block hidden group mx-auto md:mx-20 z-20 md:z-50">
                    <img src='/Captify.png' alt="logo" className="md:group-hover:scale-[.3]  md:group-hover:-translate-x-6 md:group-hover:-translate-y-2" />
                    <h1 className="custom__logo__text md:block hidden group-hover:-translate-y-8 md:group-hover:-translate-y-12">Bradley Reporting</h1>
                </a>

            </div>

            <div className={`w-full md:hidden  h-[70px] px-4 flex items-center ${!user ? 'justify-between ' : 'justify-around mx-10'}   `}>

                {
                    !user && <div className="cursor-pointer" onClick={() => setIsMobileMenuOpen(prev => !prev)}>
                        <FaBars size={24} />
                    </div>
                }

                <div >
                    <a href="/">
                        <img src="/Captify.png" alt="logo" className='w-36 rounded-md' />
                    </a>


                </div>
                <div className="">
                    {
                        !user ? (<li className="hover:text-[#777] list-none">
                            <a href="/login" className='cursor-pointer z-[999]'>
                                <button className="hover:text-[#777]">Login</button>
                            </a>
                        </li>) : (

                            <li className="hover:text-[#777] list-none ">
                                <a href="/home" className='cursor-pointer z-[999] '>
                                    <button className="hover:text-[#777]">Dashboard</button>
                                </a>




                            </li>
                        )
                    }

                </div>
            </div>

            <div className='md:block hidden'>
                <ul className="flex relative justify-center items-center gap-x-6 mt-8">
                    {
                        !user && <li className="cursor-pointer flex items-center gap-x-2 hover:text-[#777]" onClick={toggleWhatWeDoDropdown}>
                            <span>
                                What we do
                            </span>

                            <span className=''>
                                <IoIosArrowDown />
                            </span>
                        </li>
                    }




                    {isWhatWeDoOpen && (
                        <ul ref={whatWeDoRef} className="absolute z-[999] w-full ease-in duration-200 transition-all  bg-[#202020] text-white   translate-y-[16.8rem] space-y-2 shadow-lg">
                            <div className='max-w-screen-2xl px-20 py-10'>
                                <div>

                                    <h1 className='flex items-center gap-5 cursor-pointer    '>

                                        <span className='hover-underline-animation'>
                                            What we do
                                        </span>
                                        <IoIosArrowForward size={20} className='bg-purple-600 w-8 h-5 p-[2px]' /></h1>


                                    <p className='mb-7 text-[#777]'>Services</p>
                                    <div className="grid grid-cols-2 gap-10">
                                        {/* Legal Column */}
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Legal</h2>
                                            <div className='grid grid-cols-1'>
                                                {legalServices.map((service) => (
                                                    <div key={service.label} className='p-2'>
                                                        <a href={service.link} className='hover-underline-animation font-normal'>
                                                            {service.label}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Corporate & Government Column */}
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Corporate & Government</h2>
                                            <div className='grid grid-cols-1'>
                                                {corporateGovernmentServices.map((service) => (
                                                    <div key={service.label} className='p-2'>
                                                        <a href={service.link} className='hover-underline-animation font-normal'>
                                                            {service.label}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </ul>
                    )}
                    {
                        !user && <a href={'/what-we-think'} className='hover:text-[#777] cursor-pointer'>
                            What we think
                        </a>
                    }


                    {
                        !user && <li className="relative cursor-pointer flex items-center gap-x-2 hover:text-[#777]" onClick={toggleWhatWeAreDropdown}>
                            <span className=''>
                            Who we are
                            </span>
                            <span className=''>
                                <IoIosArrowDown />
                            </span>
                        </li>
                    }



                    {
                        user && <a href='/home' className='cursor-pointer z-[999] '>

                            <button className='hover:text-[#777] text-white '>Dashboard</button>

                        </a>
                    }
                    {isWhatWeAreOpen && (
                        <ul ref={whatWeAreRef} className="absolute w-full max-w-[1980px] z-[999]  bg-[#202020] text-white   translate-y-[12rem] space-y-2 shadow-lg">
                            <div className='max-w-screen-2xl px-20 py-10'>
                                <div>
                                    <h1 className='flex items-center gap-5 cursor-pointer    '>
                                        <span className='hover-underline-animation cursor-pointer'>
                                        About Captify.live
                                        </span>
                                        <IoIosArrowForward size={20} className='bg-purple-600 w-8 h-5 p-[2px]' /></h1>
                                    {/* <p className='mb-7 text-[#777]'>Under Leaders</p> */}
                                    <div className='grid grid-cols-1'>
                                        {
                                            whatWeAre.map((e) => (
                                                <div key={e} className='p-2'>
                                                    <a href={e.link} className='hover-underline-animation font-normal cursor-pointer'>{e.label}</a>
                                                </div>
                                            ))

                                        }

                                    </div>
                                </div>

                            </div>
                        </ul>
                    )}
                </ul>


                {
                    user ? (
                        <div className=" md:flex justify-end items-center -mt-6 gap-x-6 mr-20 ">

                            <a onClick={handleLogout} className='cursor-pointer z-[999]'>

                                <button className='hover:text-[#777] text-white '>Logout</button>

                            </a>



                        </div>



                    ) : (
                        <div className="hidden md:flex justify-end items-center -mt-6 gap-x-6 mr-20 z-[999]">

                            <a href="/login" className='cursor-pointer z-[999]'>

                                <button className='hover:text-[#777] text-white '>Login</button>

                            </a>
                            <a href="/signup" className='cursor-pointer z-[999]'>
                                <button className='hover:text-[#777] text-white cursor-pointer z-[999]'>Signup</button>
                            </a>
                        </div>
                    )
                }
            </div>








            {isMobileMenuOpen && (




                <div className="md:hidden h-screen bg-black z-50 pt-4 fixed top-0 overflow-y-auto  w-full  pb-5">
                    <a href="/" className='px-4 text-sm flex items-center gap-x-1'><IoIosArrowBack size={16} color='white' /> Back</a>
                    <ul className="flex flex-col items-start gap-8 mt-4">
                        <li className="cursor-pointer flex items-center px-4 justify-between w-full gap-2" onClick={toggleWhatWeDoDropdown}>
                            <span>What we do</span>
                            <IoIosArrowForward />
                        </li>
                        {isWhatWeDoOpen && (
                            <ul ref={whatWeDoRef} className="bg-black  z-[999] w-full text-white  py-2 shadow-lg">
                                <div className="grid grid-cols-1 gap-10 px-4">
                                    {/* Legal Column */}
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">Legal</h2>
                                        <div className='grid grid-cols-1'>
                                            {legalServices.map((service) => (
                                                <div key={service.label} className='p-2'>
                                                    <a href={service.link} className='hover-underline-animation font-normal'>
                                                        {service.label}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Corporate & Government Column */}
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">Corporate & Government</h2>
                                        <div className='grid grid-cols-1'>
                                            {corporateGovernmentServices.map((service) => (
                                                <div key={service.label} className='p-2'>
                                                    <a href={service.link} className='hover-underline-animation font-normal'>
                                                        {service.label}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        )}
                        <a href={'/what-we-think'} className="hover:text-[#777] z-[999] cursor-pointer px-4">
                            What we think
                        </a>

                        <li className="cursor-pointer flex items-center justify-between px-4 w-full gap-2" onClick={toggleWhatWeAreDropdown}>
                            <span>Who we are</span>
                            <IoIosArrowForward />

                        </li>
                        {isWhatWeAreOpen && (
                            <ul ref={whatWeAreRef} className="bg-black z-[999] text-white py-2 w-full shadow-lg">
                                {/* <p className=' text-[#777] px-4'>Under Leaders</p> */}
                                {whatWeAre.map(({ label, link }) => (
                                    <li key={label} className="px-1 py-[2px]">
                                        <a href={link} className="hover-underline-animation text-sm font-[385]">{label}</a>
                                    </li>
                                ))}
                            </ul>
                        )}


                    </ul>
                </div>






            )}



        </div>
    );
}

export default Header;
