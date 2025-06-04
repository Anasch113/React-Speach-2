import video from "../../assets/hero-video.mp4";

import Wrapper from "../layout/wrapper/Wrapper"
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
const Hero = () => {


  const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);
  const whatWeDoRef = useRef(null);


  const toggleWhatWeDoDropdown = () => {
    setIsWhatWeDoOpen(prevState => !prevState);

  };

  const handleClickOutside = (event) => {
    if (whatWeDoRef.current && !whatWeDoRef.current.contains(event.target)) {
      setIsWhatWeDoOpen(false);
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
    { label: 'Transcript summarisation', link: '/transcript-summarisation' },
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
    // { label: 'Transcript summarisation', link: '/corporate-transcript-summarisation' },
    // Add more corporate & government services here...
  ];
  return (
    <div className="mt-28 md:mt-10">
      <div className="">
        <video
          src={video}
          autoPlay={true}
          loop
          className="w-full h-full object-cover"
        ></video>
        <Wrapper>
          <div className="text-white ">
            <div className="mt-[-15rem] md:mt-[-20rem] top-1/4 md:px-4 w-full flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/3">
                <h1 className="text-xl fade-in-image lg:text-3xl font-bold text-center lg:text-left">
                  Clarity You Can Trust. Support You Can Count On.
                </h1>
                <p className="">
                  Real-time transcription, live captioning, and expert legal support services—trusted by law firms, corporations, and government agencies across Australia, the Asia-Pacific and USA.

                </p>
              </div>
              <div className="w-full lg:w-1/3 lg:pl-8">
                <div className="w-[60px] h-[5px] bg-[#a100ff] mb-5 mx-auto mt-5 md:mt-0 lg:mx-0"></div>
                <span className="text-left mx-5 fade-in-image space-y-2">
                  <p className="space-y-2"> Since 2004, we’ve partnered with litigation teams, public institutions and corporate clients to deliver precise, secure and professional speech-to-text services—wherever and whenever they’re needed.</p>

                  <p className="space-y-2">Our human-delivered services include legal videography, onsite and remote court reporting, deposition and hearing transcript summarisation, live stenocaptioning (CART), AI generated live captions, interview and meeting notes and audio transcription.</p>

                  <p className="space-y-2">Whether you need support in court, in meetings or even in remote locations, we ensure that every word is captured with clarity and confidence.
                    Our human delivered solutions are complemented by cutting-edge, secure AI voice capture tools—tailored to your timeline, your team and your confidentiality needs.</p>


                </span>
                <button onClick={() => {
                  setIsWhatWeDoOpen(!isWhatWeDoOpen)
                }} className=" fade-in-image mt-10 text-xl font-semibold flex items-center mx-auto lg:mx-0">
                  See what we do{" "}

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 256 512"
                    className="customBtn2 ml-3 mt-2"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                  </svg>
                </button>

              </div>
            </div>


          </div>

        </Wrapper>

      </div>
      {isWhatWeDoOpen && (
        <ul
          ref={whatWeDoRef}
          className="absolute z-[999] w-full ease-in duration-200 transition-all bg-[#202020] text-white space-y-2 shadow-lg -translate-y-[35rem]"
        >
          <div className="max-w-screen-2xl px-20 py-10">
            <div>
              <h1 className="flex items-center gap-5 cursor-pointer">
                <span className="hover-underline-animation">What we do</span>
                <IoIosArrowForward size={20} className="bg-purple-600 w-8 h-5 p-[2px]" />
              </h1>
              <p className="mb-7 text-[#777]">Services</p>
              <div className="grid grid-cols-2 gap-10">
                {/* Legal Column */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Legal</h2>
                  <div className="grid grid-cols-1">
                    {legalServices.map((service) => (
                      <div key={service.label} className="p-2">
                        <a href={service.link} className="hover-underline-animation font-normal">
                          {service.label}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Corporate & Government Column */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Corporate & Government</h2>
                  <div className="grid grid-cols-1">
                    {corporateGovernmentServices.map((service) => (
                      <div key={service.label} className="p-2">
                        <a href={service.link} className="hover-underline-animation font-normal">
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

    </div>
  );
};

export default Hero;
