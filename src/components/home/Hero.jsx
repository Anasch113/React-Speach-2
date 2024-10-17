import video from "../../assets/hero-video.mp4";

import Wrapper from "../layout/wrapper/Wrapper"

const Hero = () => {
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
                  Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.
                </h1>
                <h1 className="text-xl fade-in-image lg:text-3xl font-bold text-center lg:text-right md:pr-8 mt-3 md:mt-10">
                  Sun Tzu – The Art of War
                </h1>
              </div>
              <div className="w-full lg:w-1/3 lg:pl-8">
                <div className="w-[60px] h-[5px] bg-[#a100ff] mb-5 mx-auto mt-5 md:mt-0 lg:mx-0"></div>
                <p className="text-left mx-5 fade-in-image">
                  Captify.live provides your law firm with a decisive strategic edge in litigation, allowing you to plan and act with precision before the case unfolds. Powered by advanced AI, our platform enhances your ability to identify critical insights, streamline processes, and make informed decisions faster than ever before. Embrace the future of litigation support and position your firm to win—before the battle even begins—with Captify.live.
                </p>
                <button className=" fade-in-image mt-10 text-xl font-semibold flex items-center mx-auto lg:mx-0">
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
    </div>
  );
};

export default Hero;
