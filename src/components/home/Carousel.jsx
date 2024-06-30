/* eslint-disable react/prop-types */



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from "react-icons/fa6";
import img1 from "../../assets/img8.jpeg"
import img2 from "../../assets/img1.jpeg"
import img3 from "../../assets/img2.jpeg"
import img4 from "../../assets/img3.jpeg"
import img5 from "../../assets/img4.jpeg"
import img6 from "../../assets/img5.jpeg"
import img7 from "../../assets/img6.jpeg"
import img8 from "../../assets/img7.jpeg"
import { useState } from "react";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={`cursor-pointer  md:block hidden absolute z-50 -bottom-16  left-32  p-1 rounded-md  transition-all duration-200 ease-linear`}
            onClick={onClick}
        >
            <FaArrowRight
                size={40}
                className="text-white transition-all duration-200 ease-linear"
            />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={`cursor-pointer md:block hidden left-16 absolute z-50 -bottom-16  p-1 rounded-md  transition-all duration-200 ease-linear`}
            onClick={onClick}
        >
            <FaArrowLeft
                size={40}
                className="text-white transition-all duration-200 ease-linear"
            />
        </div>
    );
}

const Carousel = () => {
    const [isPaused, setIsPaused] = useState(false);

    const handlePlayPause = () => {
        setIsPaused(!isPaused);
    };
    const data = [
        {
            img: img1,
            heading: "Unlock the Power of Legal Process Automation",
            para: "Legal work is often complex and time-consuming, but it doesn't have to be. Our Legal Process Automation Solutions leverage cutting-edge technology to automate repetitive tasks, streamline workflows, and optimize efficiency, allowing you to focus on delivering exceptional legal services to your clients.",
            link: "/"
        },
        {
            img: img2,
            heading: "Unlock the Power of Sentiment Analysis for Jury Selection",
            para: "Jury selection is a critical aspect of trial strategy, and understanding the sentiments and biases of potential jurors can significantly impact case outcomes. Our Sentiment Analysis for Jury Selection tool utilizes advanced AI algorithms to analyze juror responses, social media activity, and public data, providing invaluable insights to help you build a persuasive case.",
            link: "/"
        },
        {
            img: img3,
            heading: "Empower Your Business with Proactive Intellectual Property Monitoring",
            para: "Intellectual property (IP) assets are valuable assets that require vigilant protection against infringement, piracy, and unauthorized use. Our Intellectual Property Monitoring solutions offer comprehensive monitoring and enforcement capabilities to safeguard your IP rights, mitigate risks, and preserve the integrity of your brand and innovations.",
            link: "/"
        },
        {
            img: img4,
            heading: "Simplify Compliance with Automation",
            para: "Staying compliant with regulations is vital for your business, but it doesn't have to be overwhelming. Our Compliance Automation Solutions empower you to automate complex regulatory processes, ensuring accuracy, efficiency, and peace of mind.",
            link: "/"
        },
        {
            img: img5,
            heading: "Unlock the Power of Legal Process Automation",
            para: "Legal work is often complex and time-consuming, but it doesn't have to be. Our Legal Process Automation Solutions leverage cutting-edge technology to automate repetitive tasks, streamline workflows, and optimize efficiency, allowing you to focus on delivering exceptional legal services to your clients.",
            link: "/"
        },
        {
            img: img6,
            heading: "Transform E-Discovery with Cutting-Edge Solutions",
            para: "In today’s digital age, managing vast amounts of electronic data for legal cases can be daunting. Our e-discovery solutions leverage AI technology to streamline the discovery process, ensuring efficiency, accuracy, and compliance. Discover how our advanced tools can enhance your e-discovery workflow.",
            link: "/"
        },
        {
            img: img7,
            heading: "Gain Insight, Minimize Exposure: Legal Risk and Assessment",
            para: "In today's dynamic legal landscape, proactively managing and assessing legal risks is essential for ensuring compliance and protecting your organization's interests. Our Legal Risk and Assessment solutions provide comprehensive tools and insights to help you navigate regulatory complexities and mitigate potential liabilities.",
            link: "/"
        },
        {
            img: img8,
            heading: "Unlock the Power of Virtual Legal Assistance",
            para: "Our Virtual Legal Assistance services offer convenient and efficient support to legal professionals, enabling them to streamline their workflows, enhance productivity, and deliver better client service. Experience the benefits of having a dedicated virtual assistant at your fingertips, ready to assist with research, document preparation, scheduling, and more.",
            link: "/"
        },
        {
            img: img1,
            heading: "Unlock the Power of Sentiment Analysis for Jury Selection",
            para: "Jury selection is a critical aspect of trial strategy, and understanding the sentiments and biases of potential jurors can significantly impact case outcomes. Our Sentiment Analysis for Jury Selection tool utilizes advanced AI algorithms to analyze juror responses, social media activity, and public data, providing invaluable insights to help you build a persuasive case.",
            link: "/"
        },
        {
            img: img2,
            heading: "Empower Your Business with Proactive Intellectual Property Monitoring",
            para: "Intellectual property (IP) assets are valuable assets that require vigilant protection against infringement, piracy, and unauthorized use. Our Intellectual Property Monitoring solutions offer comprehensive monitoring and enforcement capabilities to safeguard your IP rights, mitigate risks, and preserve the integrity of your brand and innovations.",
            link: "/"
        },
    ];
    const settings = {
        dots: true,
        dotsClass: "slick-dots line-indicator",
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !isPaused,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    autoplay: !isPaused,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
        customPaging: (i) => <div className="-mt-3 text-xs opacity-0">{i}</div>,
    };

    return (
        <div>
            <div className="max-w-screen-xl mx-auto mt-20">


                <Slider {...settings} className="w-full gap-20">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="text-white "

                        >
                            <div className="flex md:flex-row  flex-col w-full">
                                <div className="w-full md:w-2/3">
                                    <img src={item.img} alt="" className="h-full max-h-[200px] md:max-h-[500px] w-full object-cover " />

                                </div>
                                <div className="flex flex-col text-white w-full md:w-1/2 md:p-20">
                                    <h1 className="font-bold text-xl md:text-2xl">{item.heading}</h1>
                                    <p className="text-sm line-clamp-5">{item.para}</p>

                                    <div className="flex items-center md:pt-[20px] text-base md:text-[20px]"><span>Read more</span> <button className="customBtn2 h-[25px] rounded-sm ml-3 mt-1"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></button></div>

                                </div>

                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="absolute mt-[1.4rem] md:block hidden">
                    <button onClick={handlePlayPause}>
                        {isPaused ? <FaPlay size={35} className="text-white"/> : <FaPause size={35} className="text-white" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
