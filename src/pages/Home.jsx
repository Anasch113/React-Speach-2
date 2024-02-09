import React from 'react'
import Headers from "../components/DesignLayouts/Headers"
import Footer from "../components/DesignLayouts/Footer"
const Home = () => {
  return (
    <>
    <Headers/>
      <section className="mt-40">
        <section
            className="w-full min-h-[50vh] 2xl:hero-wapper2 xl:hero-wapper2 2xl:hero-wapper xl:hero-wapper hero-wapper2">
            <div className="container mx-auto">
                <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center">
                    <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                        <h4 className="text-gray-400 text-2xl font-bold">Interprefy Aivia Captions</h4>
                        <h1
                            className="2xl:text-4xl xl:text-4xl text-2xl text-white font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                            Make your events accessible for everyone</h1>
                        <p className="text-white mt-3 mb-10">Remarkably precise AI-powered live captions in your audiences
                            language. Live and translated captions to guarantee that your events content is accessible
                            for everyone.</p><a className="text-white px-6 py-3 bg-[#0f83d1] rounded-full" href="">Request a
                            demo</a>
                    </div>
                    <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                        <picture><img src="/assets/images/banner/captions hero (1).webp" alt="" /></picture>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <section className="py-10 w-full min-h-full mt-20">
        <div className="container mx-auto">
            <h1 className="text-2xl text-center font-bold">Captions and subtitles benefit everyone</h1>
            <p className="text-center mt-8 leading-[1.4]">An essential aid for many people to follow video content,
                especially if they have hearing impairments, if other distractions compete for their attention or if
                they dont speak the language.</p>
            <div className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 justify-center items-center mt-32">
                    <div>
                        <div className="w-full">
                            <div className="flex gap-8 flex-row">
                                <div>
                                    <picture><img src="/assets/icons/Icons_Interpreter.webp" alt=""
                                            className="w-20 h-20 object-contain" /></picture>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl mb-3 font-bold">15% of American adults report issues hearing
                                    </h2>
                                    <div className="w-20 h-0.5 mb-4 bg-[#FF9127]"></div>
                                    <p className="text-lg text-gray-600">Make your events more accessible and inclusive by
                                        including a visual aid of what&#x27;s being said.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="flex gap-8 flex-row">
                                <div>
                                    <picture><img src="/assets/icons/Icons_Integration.webp" alt=""
                                            className="w-20 h-20 object-contain" /></picture>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl mb-3 font-bold">31% would attend more live events with captions
                                    </h2>
                                    <div className="w-20 h-0.5 mb-4 bg-[#FF9127]"></div>
                                    <p className="text-lg text-gray-600">Our seamless integration with your AV setup and
                                        preferred event or meeting platform provides a truly immersive experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="flex gap-8 flex-row">
                                <div>
                                    <picture><img src="/assets/icons/Icons_Translate.webp" alt=""
                                            className="w-20 h-20 object-contain" /></picture>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl mb-3 font-bold">Find pro interpreters worldwide</h2>
                                    <div className="w-20 h-0.5 mb-4 bg-[#FF9127]"></div>
                                    <p className="text-lg text-gray-600">We&#x27;ve trained over 6,000 pro interpreters and
                                        partner with top agencies to find the best interpreters for your required
                                        languages and subject areas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="flex gap-8 flex-row">
                                <div>
                                    <picture><img src="/assets/icons/Icons_Inclusivity.webp" alt=""
                                            className="w-20 h-20 object-contain" /></picture>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl mb-3 font-bold">All-in-one language access</h2>
                                    <div className="w-20 h-0.5 mb-4 bg-[#FF9127]"></div>
                                    <p className="text-lg text-gray-600">Experience the power of one app that combines
                                        simultaneous, sign language interpretation, live captioning and subtitling, and
                                        AI speech translation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="flex gap-8 flex-row">
                                <div>
                                    <picture><img src="/assets/icons/Icons_Security@4x.webp" alt=""
                                            className="w-20 h-20 object-contain" /></picture>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl mb-3 font-bold">ISO 27001-certified security</h2>
                                    <div className="w-20 h-0.5 mb-4 bg-[#FF9127]"></div>
                                    <p className="text-lg text-gray-600">Top-of-the-line security measures and protocols in
                                        encryption, transmission, user authentication, and data management keep your
                                        meetings safe.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="flex gap-8 flex-row">
                                <div>
                                    <picture><img src="/assets/icons/Icons_Eco-Friendly@4x.webp" alt=""
                                            className="w-20 h-20 object-contain" /></picture>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl mb-3 font-bold">Reduce carbon emissions</h2>
                                    <div className="w-20 h-0.5 mb-4 bg-[#FF9127]"></div>
                                    <p className="text-lg text-gray-600">No need to fly in interpreters. A cloud-based
                                        virtual booth enables professional conference interpreters to work from anywhere
                                        in the world.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="py-10 mt-20 bg-[#fffaf5]">
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center">Boost comprehension in any language</h1>
            <div className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 justify-center items-center mt-32">
                    <div className="w-full bg-white p-8 shadow-sm">
                        <h3 className="text-xl font-bold">Closed Captioning</h3>
                        <p className="text-xs my-4 text-gray-500">Speech-to-text service powered by AI</p>
                        <p className="text-base my-4 text-gray-500">Effortlessly transcribe spoken language in its original
                            form, instantly and in real-time. With stunning accuracy in over 70 languages.</p><a
                            className="border-b border-solid border-[#0f83d1] text-[#0f83d1]" href="">Explore languages</a>
                    </div>
                    <div className="w-full bg-white p-8 shadow-sm">
                        <h3 className="text-xl font-bold">Live Subtitling</h3>
                        <p className="text-xs my-4 text-gray-500">Speech-to-translated-text service powered by AI.</p>
                        <p className="text-base my-4 text-gray-500">Experience the power of real-time speech translation.
                            Delight your audience with AI-driven live translation in more than 70 languages.</p><a
                            className="border-b border-solid border-[#0f83d1] text-[#0f83d1]" href="">Explore languages</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="py-10 mt-20">
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center">Stunning captioning wherever your audience is</h1>
            <div className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 justify-center items-center mt-32">
                    <div className="w-full bg-white p-8 shadow-sm">
                        <picture><img src="/assets/images/others/in-person.webp" alt="" /></picture>
                        <h3 className="text-xl font-bold">For in-person audiences</h3>
                        <p className="text-sm my-4 text-gray-500">Stream captions live on stage or let your audience see
                            them on their phones in the language they prefer.</p>
                    </div>
                    <div className="w-full bg-white p-8 shadow-sm">
                        <picture><img src="/assets/images/others/online.webp" alt="" /></picture>
                        <h3 className="text-xl font-bold">For online audiences</h3>
                        <p className="text-base my-4 text-gray-500">Stream captions anywhere: to over 70 meeting and event
                            platforms, to peoples phones, or to a live feed URL.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="bg-[#fffaf5] py-10 mt-20">
        <div className="container mx-auto">
            <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center">
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                    <h4 className="text-[#FF9127] text-sm font-bold">MANAGED SERVICES</h4>
                    <h1
                        className="2xl:text-xl xl:text-xl text-base mt-6 text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                        Enjoy a worry-free experience</h1>
                    <p className="text-black mt-3 mb-10">Benefit from having dedicated project management, live monitoring,
                        and technical support to ensure a seamless, trouble-free event experience for everyone.</p>
                </div>
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                    <picture><img src="/assets/images/others/Interprefy Remote Support Technician.webp" alt="" />
                    </picture>
                </div>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center mt-20">
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                    <picture><img src="/assets/images/others/various-languages.webp" alt="" /></picture>
                </div>
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                    <h4 className="text-[#FF9127] text-sm font-bold">100+ LANGUAGE COMBINATIONS</h4>
                    <h1
                        className="2xl:text-xl xl:text-xl text-base mt-6 text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                        Access the worlds most spoken languages and more</h1>
                    <p className="text-black mt-3 mb-10">Easily convert spoken language from more than 70 different
                        languages and seamlessly translate speech in over 100 language combinations, enabling you to
                        break through language barriers worldwide.</p>
                </div>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center mt-20">
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                    <h4 className="text-[#FF9127] text-sm font-bold">AI BENCHMARKING</h4>
                    <h1
                        className="2xl:text-xl xl:text-xl text-base mt-6 text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                        Use the best AI technology on the market</h1>
                    <p className="text-black mt-3 mb-10">Not every engine provides equal results. Because we continuously
                        benchmark the leading engines available on the market, you can rest assured youre using the
                        best-performing engine for each language combination.</p>
                </div>
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                    <picture><img src="/assets/images/others/benchmark.webp" alt="" /></picture>
                </div>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center mt-20">
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                    <picture><img src="/assets/images/others/optimization.webp" alt="" /></picture>
                </div>
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                    <h4 className="text-[#FF9127] text-sm font-bold">ENGINE OPTIMISATION</h4>
                    <h1
                        className="2xl:text-xl xl:text-xl text-base mt-6 text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                        Refine world-class AI engines to match your unique terminology</h1>
                    <p className="text-black mt-3 mb-10">Make sure even hard-to-catch, but crucial words like your speaker
                        names, brand names, technical terms, and abbreviations are recognised by AI. We optimise the
                        speech-to-text engine to get your terminology right.</p>
                </div>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center mt-20">
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                    <h4 className="text-[#FF9127] text-sm font-bold">INTEGRATIONS</h4>
                    <h1
                        className="2xl:text-xl xl:text-xl text-base mt-6 text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                        Stream live captions anywhere</h1>
                    <p className="text-black mt-3 mb-10">Enjoy the freedom to broadcast captions to any of the more than 70
                        event and meeting platforms that Interprefy integrates with - including Zoom, Teams, YouTube, or
                        even your auditorium, no matter where you meet.</p>
                </div>
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                    <picture><img src="/assets/images/others/live captions for online meetings.webp" alt="" /></picture>
                </div>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row flex-col justify-between items-center mt-20">
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-8">
                    <picture><img src="/assets/images/others/closed captions for videos (2).webp" alt="" /></picture>
                </div>
                <div className="2xl:w-2/5 xl:w-2/5 w-full 2xl:mt-0 xl:mt-0 mt-12">
                    <h4 className="text-[#FF9127] text-sm font-bold">CLOSED CAPTIONS FOR ON-DEMAND VIDEOS</h4>
                    <h1
                        className="2xl:text-xl xl:text-xl text-base mt-6 text-black font-bold 2xl:leading-[1.6] xl:leading-[1.6]">
                        Expand your event impact beyond live</h1>
                    <p className="text-black mt-3 mb-10">To make your video recordings available and accessible after the
                        event and even to improve your SEO, add closed captioning files to your on-demand videos.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="w-full 2xl:p-20 xl:p-20 p-6 bg-[#0f83d1]">
        <div className="container mx-auto">
            <div className="flex 2xl:flex-row xl:flex-row flex-col gap-10">
                <div className="2xl:w-1/2 xl:w-1/2 w-full">
                    <picture><img src="/assets/images/others/Untitled design (84).webp" alt="" /></picture>
                </div>
                <div className="2xl:w-1/2 xl:w-1/2 w-full">
                    <h2 className="text-white text-2xl font-bold mb-4">Request a demo and start making your events more
                        accessible</h2>
                    <p className="text-white">Contact us today to discover how we can assist you in seamlessly incorporating
                        automatic captions and translated subtitles into your upcoming meetings and events.</p>
                    <form action=""><input type="text"
                            className="w-full bg-white h-12 border-0 outline-none px-4 mt-8 text-sm"
                            placeholder="First Name" /><input type="text"
                            className="w-full bg-white h-12 border-0 outline-none px-4 mt-4 text-sm"
                            placeholder="Email address" /><button
                            className="bg-[#0f83d1] w-full h-12 rounded-md mt-4 text-white font-bold">Next</button></form>
                </div>
            </div>
        </div>
    </section>
    <section className="py-10 mt-10">
        <div className="max-w-screen-xl mx-auto 2xl:px-0 xl:px-0 px-6">
            <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3">
                <div className="w-full bg-white shadow">
                    <picture><img src="/assets/images/others/Blog 1.webp" className="w-full" alt="" /></picture>
                    <div className="p-8">
                        <h6 className="text-sm">4 min read</h6>
                        <h4 className="text-xl font-bold mt-4">Event Tech Live: Expanding audiences with captions and...
                        </h4>
                        <p className="text-base font-semibold text-gray-600 uppercase mt-3">Hybrid Events, Captions, RSI,
                            MT, captions, ASR captions</p>
                    </div>
                </div>
                <div className="w-full bg-white shadow">
                    <picture><img src="/assets/images/others/blog2.webp" className="w-full" alt="" /></picture>
                    <div className="p-8">
                        <h6 className="text-sm">3 min read</h6>
                        <h4 className="text-xl font-bold mt-4">WGS 23: combining market-leading technology and tech...</h4>
                        <p className="text-base font-semibold text-gray-600 uppercase mt-3">Hybird Events, RSI, in-person
                            interpretion</p>
                    </div>
                </div>
                <div className="w-full bg-white shadow">
                    <picture><img src="/assets/images/others/blog3.jpg" className="w-full" alt="" /></picture>
                    <div className="p-8">
                        <h6 className="text-sm">3 min read</h6>
                        <h4 className="text-xl font-bold mt-4">Resilience Hub: remote interpreting for an inclusive
                            hybrid...</h4>
                        <p className="text-base font-semibold text-gray-600 uppercase mt-3">Inclusive, hybrid Events, RSI
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8 w-full mx-auto"><a
                    className="text-[#0f83d1] w-full h-12 flex items-center justify-center rounded-md underline font-medium mt-6"
                    href="">View all <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" className="lucide lucide-arrow-up-right">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                    </svg></a></div>
        </div>
    </section>
<Footer/>
    </>
  )
}

export default Home
