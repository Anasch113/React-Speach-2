/* eslint-disable react/prop-types */



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




const Carousel = () => {

    const data = [
        {
            label: "Bradley Reporting Appoints Karalee Close as Global Talent & Organization Lead to Help Power Clients' Reinvention with Technology and Talent",
            date: "2024 April 03 ",
        },
        {
            label: "Bradley Reporting Invests in Sanctuary Al to Bring Al-Powered, Humanoid Robotics to Work Alongside Humans ",
            date: "2024 March 27 ",
        },
        {
            label: "Bradley Reporting Appoints Karalee Close as Global Talent & Organization Lead to Help Power Clients' Reinvention with Technology and Talent",
            date: "2024 April 03 ",
        },
        {
            label: "Bradley Reporting Appoints Karalee Close as Global Talent & Organization Lead to Help Power Clients' Reinvention with Technology and Talent",
            date: "2024 April 03 ",
        },
        {
            label: "Bradley Reporting Appoints Karalee Close as Global Talent & Organization Lead to Help Power Clients' Reinvention with Technology and Talent",
            date: "2024 April 03 ",
        },
        {
            label: "Bradley Reporting Appoints Karalee Close as Global Talent & Organization Lead to Help Power Clients' Reinvention with Technology and Talent",
            date: "2024 April 03 ",
        },
    ];
    const settings = {
        dots: false,
        dotsClass: "slick-dots line-indicator",
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,

        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    autoplay: true,
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
            <div className=" md:mt-20">


                <Slider {...settings} className="w-full gap-x-20">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="text-white"

                        >
                            <div className="text-white   text-start relative hover:opacity-60"><div className="flex px-5 flex-col align-bottom  mt-20 pl-[5%]"><p className="text-lg">{item.label}</p><p className="text-sm mt-2">{item.date}</p><div></div></div></div>
                        </div>
                    ))}
                </Slider>

            </div>
        </div>
    );
};

export default Carousel;
