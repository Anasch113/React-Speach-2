import React from 'react'
import Headers from "../../components/DesignLayouts/Headers"
import Footer from "../../components/DesignLayouts/Footer"
import { useUserAuth } from '../../context/UserAuthContext'

const Pricing = () => {
    const { user } = useUserAuth();
    console.log(user.uid)

    const checkout = async (plan) => {
        console.log("your plan ", plan)
        await fetch(`${import.meta.env.VITE_HOST_URL}/subscriptions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({ plan: plan, customerId: user.uid })
        })
            .then((res) => {

                if (res.ok) return res.json();
                console.log("res in client req post", res)
                return res.json().then((json) => Promise.reject(json));
            })
            .then(({ session }) => {
                window.location = session.url
            })
            .catch((e) => {
                console.log(e)
            })
    }




    return (
        <>
            <Headers />
            <div className="pt-40 overflow-x-hidden">
                <section className="w-full min-h-[50vh] bg-[#0f83d1] 2xl:hero-wapper">
                    <div className="container mx-auto">
                        <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center">
                            <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                                <h1
                                    className="2xl:text-3xl xl:text-3xl text-2xl text-white font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                                    Only pay for what you need</h1>
                                <p className="text-white mt-3 mb-10">We offer bespoke pricing plans to meet your unique
                                    requirements, whether youre a small or large business and need on-site, hybrid, or remote
                                    services. Because no two events are the same.</p><button
                                        className="text-white px-6 py-3 bg-[#a574f5] rounded-full"><a href="">Get a quote</a></button>
                            </div>
                            <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                                <picture><img src="/assets/images/banner/pricing-main.webp" alt="" /></picture>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-[#f7f8f8] min-h-full py-10">
                    <div className="container mx-auto">
                        <h2 className="text-base text-center text-[#777575] font-medium">LOVED BY SOME OF THE WORLD’S LEADING
                            ORGANISATIONS</h2>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-7 justify-center items-center mt-8">
                            <div>
                                <picture><img src="/assets/images/socials/facebook.svg" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                            <div>
                                <picture><img src="/assets/images/socials/Amw_Logo_Black.webp" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                            <div>
                                <picture><img src="/assets/images/socials/domino-pizza.svg" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                            <div>
                                <picture><img src="/assets/images/socials/google.svg" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                            <div>
                                <picture><img src="/assets/images/socials/GSK.webp" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                            <div>
                                <picture><img src="/assets/images/socials/Sap.webp" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                            <div>
                                <picture><img src="/assets/images/socials/customers.webp" alt=""
                                    className="filter grayscale opacity-20" /></picture>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='min-h-screen flex flex-col  items-center justify-center w-full bg-[#F2F2F3] max-[650px]:pt-10 '>

                    <div className='flex flex-row items-center justify-center   w-full gap-8 flex-wrap'>

                               {/* First Package */}

                        <div className="flex flex-col px-10   justify-center bg-white w-96 min-h-400  rounded-lg gap-10  py-10 max-[500px]:w-80">
                            <div className='font-poppins flex flex-col gap-4 '>
                                <p className='text-[#009996] font-medium  font-roboto  text-xl'>Basic</p>
                                <p className='text-3xl font-medium'>$10 per month </p>
                                <p className='bg-[#e1f7f7] p-1 w-2/4 text-center rounded-2xl text-[#009996] text-sm px-2'>Billed annually</p>

                            </div>

                            <div className=''>
                                <button onClick={() => checkout("10")} className='font-poppins bg-[#009996]  py-3 px-3 rounded-md w-44 text-white hover:bg-[#55c6c5]'>
                                    Get Now
                                </button>
                            </div>

                            <div className='flex flex-col p-2 gap-4  pt-5 '>
                                <p className='font-poppins -ml-2 text-lg'>What you get:</p>

                                <div className='flex flex-col gap-2 text-text-color-blue font-roboto '>
                                    <p> &#10003; Unlimited Download</p>
                                    <p>&#10003; PDF Format</p>
                                    <p>&#10003; Video Download</p>
                                    <p>&#10003; Transcription</p>
                                </div>
                            </div>
                        </div>



     {/* Second Package */}

     <div className="flex flex-col px-10   justify-center bg-white w-96 min-h-400  rounded-lg gap-10  py-10 max-[500px]:w-80">
                            <div className='font-poppins flex flex-col gap-4 '>
                                <p className='text-[#4D5EC3] font-roboto font-medium text-xl'>Professional</p>
                                <p className='text-3xl font-medium'>$20 per month </p>
                                <p className='bg-[#d8ddf9] p-1 w-2/4 text-center rounded-2xl text-[#4D5EC3] text-sm px-2'>Billed annually</p>

                            </div>

                            <div className=''>
                                <button onClick={() => checkout("20")} className='font-poppins bg-[#4D5EC3]  py-3 px-3 rounded-md w-44 text-white hover:bg-[#6378ed]'>
                                    Get Now
                                </button>
                            </div>

                            <div className='flex flex-col p-2 gap-4  pt-5 '>
                                <p className='font-poppins -ml-2 text-lg'>What you get:</p>

                                <div className='flex flex-col gap-2 text-text-color-blue font-roboto '>
                                    <p> &#10003; Unlimited Download</p>
                                    <p>&#10003; PDF Format</p>
                                    <p>&#10003; Video Download</p>
                                    <p>&#10003; Transcription</p>
                                </div>
                            </div>
                        </div>




     {/* Third Package */}

     <div className="flex flex-col px-10   justify-center bg-white w-96 min-h-400  rounded-lg gap-10  py-10 max-[500px]:w-80">
                            <div className='font-poppins flex flex-col gap-4 '>
                                <p className='text-[#B443B0] font-medium font-roboto  text-xl'>Business</p>
                                <p className='text-3xl font-medium'>$30 per month </p>
                                <p className='bg-[#f9e4f8] p-1 w-2/4 text-center rounded-2xl text-[#B443B0] text-sm px-2'>Billed annually</p>

                            </div>

                            <div className=''>
                                <button onClick={() => checkout("30")} className='font-poppins bg-[#B443B0]  py-3 px-3 rounded-md w-44 text-white hover:bg-[#ed63e9]'>
                                    Get Now
                                </button>
                            </div>

                            <div className='flex flex-col p-2 gap-4  pt-5 '>
                                <p className='font-poppins -ml-2 text-lg'>What you get:</p>

                                <div className='flex flex-col gap-2 text-text-color-blue font-roboto '>
                                    <p> &#10003; Unlimited Download</p>
                                    <p>&#10003; PDF Format</p>
                                    <p>&#10003; Video Download</p>
                                    <p>&#10003; Transcription</p>
                                </div>
                            </div>
                        </div>

                    </div>



                </section>

                <section className="py-20 w-full mt-20">
                    <div className="container mx-auto">
                        <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center">
                            <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                                <h1
                                    className="2xl:text-3xl xl:text-3xl text-2xl text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                                    Slash your interpreting costs by up to 75%</h1>
                                <p className="text-black mt-2 mb-10">No need to fly in interpreters and rent cumbersome hardware. By
                                    utilising remote interpreting, you can significantly reduce both financial and environmental
                                    costs, while also streamlining the process of setting up and providing interpretation
                                    services.</p>
                                <ul className="flex flex-col gap-4 mb-4">
                                    <li className="flex flex-row gap-5 font-semibold items-center">
                                        <picture><img src="/assets/icons/check.webp" className="w-8 h-8 object-contain" alt="" />
                                        </picture>No annual subscription required
                                    </li>
                                    <li className="flex flex-row gap-5 font-semibold items-center">
                                        <picture><img src="/assets/icons/check.webp" className="w-8 h-8 object-contain" alt="" />
                                        </picture>Usage-based, hourly pricing
                                    </li>
                                    <li className="flex flex-row gap-5 font-semibold items-center">
                                        <picture><img src="/assets/icons/check.webp" className="w-8 h-8 object-contain" alt="" />
                                        </picture>Save even more with bundle options
                                    </li>
                                </ul>
                            </div>
                            <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                                <picture><img src="/assets/images/others/our mission-min.webp" alt="" /></picture>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 w-full mt-20 bg-[#0f83d1]">
                    <div className="max-w-screen-md mx-auto">
                        <h1 className="text-2xl font-bold text-white text-center">Well tailor a quote around your unique needs</h1>
                        <div className="flex 2xl:flex-row xl:flex-row flex-col gap-8 mt-14"><button
                            className="w-full border border-solid border-white rounded-full outline-none py-2 transition-all ease-linear uppercase duration-300 hover:bg-white hover:text-[#0f83d1] bg-white text-[#0f83d1]"
                            id="tab-1">Simultaneous interpretation</button><button
                                className="w-full border border-solid border-white rounded-full outline-none py-2 transition-all ease-linear uppercase duration-300 hover:bg-white hover:text-[#0f83d1] text-white"
                                id="tab-2">AI Speech Translation &amp; Captions</button></div>
                    </div>
                    <div className="container mx-auto mt-14">
                        <div className="w-full p-20 bg-white rounded block">
                            <div className="flex 2xl:flex-row xl:flex-row flex-col items-center gap-10">
                                <div className="2xl:w-[60%] xl:w-[60%] w-full">
                                    <h3 className="text-xl font-bold mb-3">Pricing for simultaneous interpretation services</h3>
                                    <p>Whether youre seeking our collaboration for a unique event or aiming to maximize your
                                        savings through regular interprefied meetings, we have the perfect solution customized
                                        just for you.</p>
                                    <ul className="flex flex-col gap-y-5 mt-8">
                                        <li className="flex flex-row gap-5 items-center">
                                            <picture><img src="/assets/icons/check.webp" className="w-6 h-6 object-contain"
                                                alt="" /></picture><span><b>Technology fees -</b>We consider language count,
                                                    event duration, and user count for technology quotes</span>
                                        </li>
                                        <li className="flex flex-row gap-5 items-center">
                                            <picture><img src="/assets/icons/check.webp" className="w-8 h-8 object-contain"
                                                alt="" /></picture><span><b>Hourly interpreter fees -</b>Interpreter fees
                                                    are based on session duration through our partner Language Service
                                                    Providers</span>
                                        </li>
                                        <li className="flex flex-row gap-5 items-center">
                                            <picture><img src="/assets/icons/check.webp" className="w-10 h-10 object-contain"
                                                alt="" /></picture><span><b>Professional services -</b>On-site and remote
                                                    support, equipment setup and configuration, expert monitoring of audio and
                                                    video, recording services, and more</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="2xl:w-2/5 xl:w-2/5 w-full">
                                    <picture><img src="/assets/images/unlock/simultaneous.webp" alt="" /></picture>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-20 bg-white rounded hidden">
                            <div className="flex 2xl:flex-row xl:flex-row flex-col items-center gap-10">
                                <div className="2xl:w-[60%] xl:w-[60%] w-full">
                                    <h3 className="text-xl font-bold mb-3">Pricing for AI Speech Translation &amp; Captions</h3>
                                    <p>Save cost while maximising your language offering with best-in-class AI-powered
                                        captioning and speech translation.</p>
                                    <ul className="flex flex-col gap-y-5 mt-8">
                                        <li className="flex flex-row gap-5 items-center">
                                            <picture><img src="/assets/icons/check.webp" className="w-6 h-6 object-contain"
                                                alt="" /></picture><span><b>AI technology fees -</b>Benefit from tiered
                                                    hourly fees</span>
                                        </li>
                                        <li className="flex flex-row gap-5 items-center">
                                            <picture><img src="/assets/icons/check.webp" className="w-8 h-8 object-contain"
                                                alt="" /></picture><span><b>Event glossary preparation -</b>We support you
                                                    in preparing the AI engines to get even the most unique terminology right</span>
                                        </li>
                                        <li className="flex flex-row gap-5 items-center">
                                            <picture><img src="/assets/icons/check.webp" className="w-10 h-10 object-contain"
                                                alt="" /></picture><span><b>Professional services -</b>Receive dedicated
                                                    project support, including expert assistance with technology configuration,
                                                    continuous monitoring, recording services, and much more</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="2xl:w-2/5 xl:w-2/5 w-full">
                                    <picture><img src="/assets/images/unlock/ai.webp" alt="" /></picture>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full 2xl:p-20 xl:p-20 p-6 bg-white mt-20">
                    <div className="container mx-auto">
                        <div className="flex 2xl:flex-row xl:flex-row flex-col gap-10">
                            <div className="2xl:w-1/2 xl:w-1/2 w-full">
                                <picture><img src="/assets/images/unlock/simultaneous2.webp" alt="" /></picture>
                            </div>
                            <div className="2xl:w-1/2 xl:w-1/2 w-full">
                                <h2 className="text-black text-2xl font-bold mb-4">Talk to sales today</h2>
                                <p className="text-black">Reach out to talk about your upcoming event. Well work together to create
                                    a customised solution and quote that perfectly aligns with your needs.</p>
                                <form action=""><input type="text"
                                    className="w-full bg-white h-12 border-0 outline-none px-4 mt-8 text-sm"
                                    placeholder="First Name" /><input type="text"
                                        className="w-full bg-white h-12 border-0 outline-none px-4 mt-4 text-sm"
                                        placeholder="Email address" /><button
                                            className="bg-[#0f83d1] w-full h-12 rounded-md mt-4 text-white font-bold">Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Pricing
