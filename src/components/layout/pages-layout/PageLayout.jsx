/* eslint-disable react/prop-types */

import Footer from "../footer/Footer";

const PageLayout = ({
    heroSection,
    introduction,
    howItWorks,
    features,
    benefits,
    useCases,
    testimonials,
    callToAction,
}) => {
    return (
        <div className="md:mt-16">
            {/* Hero Section */}
            <section className="flex items-center justify-between w-full md:flex-row flex-col">
                <div className="my-5 md:my-24  md:pr-20 text-white md:w-1/2">
                    <div className="text-2xl md:text-4xl font-bold text-center md:text-left">
                        {heroSection.headline}
                    </div>
                    <p className="text-lg  md:text-xl font-normal my-8 text-center md:text-left">
                        {heroSection.subheadline}
                    </p>
                    <button className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white ">{heroSection.cta}</button>
                </div>
                <img src={heroSection.image} alt="" className="mx-auto md:w-1/2 rounded-2xl max-h-[500px] object-top object-cover" />

            </section>

            {/* Introduction */}
            <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                <h2 className="text-2xl md:text-3xl font-bold">{introduction.title}</h2>
                <p className="mt-4 text-sm md:text-base max-w-[800px]">{introduction.content}</p>
                <img src={introduction.image} alt="" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
            </section>

            {/* How It Works */}
            {
                howItWorks && (
                    <section className="text-white md:px-4  text-center py-12 flex justify-center items-center flex-col ">
                        <h2 className="text-2xl md:text-3xl font-bold">

                            {howItWorks.title}</h2>
                        <div className="flex flex-wrap mt-10 gap-10 justify-center ">
                            {howItWorks.steps.map((step, index) => (
                                <div key={index} className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[220px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                    <div className="flex flex-col items-center gap-4">
                                        <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center g">{step.id}</span>
                                        <h3 className="text-xl font-semibold ">{step.title}</h3>

                                    </div>
                                    <p className="text-sm md:text-base">{step.content}</p>
                                    <img src={step.image} alt="" />
                                </div>
                            ))}
                        </div>
                    </section>


                )
            }

            {/* Features */}
            <section className="md:px-4 py-12 text-white flex justify-center items-center flex-col">
                <h2 className="text-2xl md:text-3xl max-w-[700px] text-center font-bold">{features.title}</h2>
                <div className="flex md:flex-row flex-col gap-4 justify-center items-center text-center mt-8">
                    {features.items.map((feature, index) => (
                        <div key={index} className="space-y-4 hover:scale-105 cursor-pointer duration-300 ease-in transition-all bg-slate-900  rounded-2xl text-white py-5 md:max-w-[260px] h-[280px] flex items-center justify-center flex-col">
                            <span className="text-[#A100FF] ">{feature.icon}</span>
                            <h3 className="text-lg font-semibold px-[2px]">{feature.title}</h3>
                            <p className="px-3 text-sm md:text-base">{feature.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="text-white mt-20 text-center justify-center px-4 py-12 bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl rounded-lg transform transition duration-500 hover:scale-105">
                <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">{benefits.title}</h2>
                <p className="mt-4 text-sm md:text-lg font-light">{benefits.content}</p>
                <ul className="list-disc list-inside mt-6 space-y-2 text-left mx-auto max-w-md">
                    {benefits.items.map((benefit, index) => (
                        <li key={index} className="text-sm md:text-base font-medium list-none text-center">{benefit}</li>
                    ))}
                </ul>
                {/* <img src={benefits.image} alt="Benefit Illustration" className="mt-8 mx-auto w-3/4 h-auto rounded-lg shadow-md transition duration-500 hover:shadow-lg hover:scale-105" /> */}
            </section>
            {/* Use Cases */}
            {
                useCases && (
                    <section className=" py-12 mt-5">
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-white">{useCases.title}</h2>
                        <div className="flex flex-wrap justify-center items-center  mt-20 gap-5">
                            {useCases.items.map((useCase, index) => (
                                <div key={index} className="  flex items-center md:flex-row flex-col">
                                    <div className="flex  bg-purple-600 md:max-h-[160px] pt-8 pb-10 px-8 rounded-xl flex-col  md:text-left text-center">
                                        <h3 className="text-2xl md:mb-4 font-semibold  text-white ">{useCase.title}</h3>
                                        <p className="text-white max-w-[500px]">{useCase.content}</p>

                                    </div>
                                    <div className="hidden">
                                        <img src={useCase.image} alt="" className=" md:max-w-[650px] rounded-2xl" />

                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                )
            }


            {/* Testimonials */}
            {
                testimonials && (
                    <section className="md:px-4 md:block hidden py-12 text-white">
                        <h2 className="text-2xl text-center md:text-3xl font-bold">{testimonials.title}</h2>
                        {/* <div className="space-y-8 mt-8">
                    {testimonials.items.map((testimonial, index) => (
                        <div key={index} className="space-y-4">
                            <p>{testimonial.content}</p>
                            <p className="font-semibold">- {testimonial.client}</p>
                            <img src={testimonial.image} alt="" />
                        </div>
                    ))}
                </div> */}
                        <div className="mt-14 flex moving gap-2 md:gap-10 ">
                            {testimonials.items.map((data, id) => (
                                <div key={id} className="py-5 pl-5 flex flex-col min-w-[393px] h-[215px] rounded-[10px] border ">
                                    <div className='flex gap-3'>

                                        <div className='flex flex-col justify-between'>
                                            <p className='text-[16px] font-[500] text-white'>{data.content}</p>
                                            <svg className="my-5" xmlns="http://www.w3.org/2000/svg" width="116" height="20" viewBox="0 0 116 20" fill="none">
                                                <path d="M9.23915 2.34164C9.47864 1.60459 10.5214 1.60459 10.7608 2.34164L12.0655 6.35704C12.1726 6.68666 12.4798 6.90983 12.8264 6.90983H17.0484C17.8234 6.90983 18.1456 7.90152 17.5186 8.35704L14.1029 10.8387C13.8226 11.0424 13.7052 11.4035 13.8123 11.7331L15.117 15.7485C15.3565 16.4856 14.5129 17.0985 13.8859 16.643L10.4702 14.1613C10.1898 13.9576 9.81016 13.9576 9.52977 14.1613L6.11407 16.643C5.48709 17.0985 4.64351 16.4856 4.88299 15.7485L6.18768 11.7331C6.29478 11.4035 6.17745 11.0424 5.89706 10.8387L2.48135 8.35704C1.85438 7.90152 2.1766 6.90983 2.95158 6.90983H7.17363C7.52021 6.90983 7.82737 6.68666 7.93447 6.35704L9.23915 2.34164Z" fill="#67E776" />
                                                <path d="M33.2392 2.34164C33.4786 1.60459 34.5214 1.60459 34.7608 2.34164L36.0655 6.35704C36.1726 6.68666 36.4798 6.90983 36.8264 6.90983H41.0484C41.8234 6.90983 42.1456 7.90152 41.5186 8.35704L38.1029 10.8387C37.8226 11.0424 37.7052 11.4035 37.8123 11.7331L39.117 15.7485C39.3565 16.4856 38.5129 17.0985 37.8859 16.643L34.4702 14.1613C34.1898 13.9576 33.8102 13.9576 33.5298 14.1613L30.1141 16.643C29.4871 17.0985 28.6435 16.4856 28.883 15.7485L30.1877 11.7331C30.2948 11.4035 30.1774 11.0424 29.8971 10.8387L26.4814 8.35704C25.8544 7.90152 26.1766 6.90983 26.9516 6.90983H31.1736C31.5202 6.90983 31.8274 6.68666 31.9345 6.35704L33.2392 2.34164Z" fill="#67E776" />
                                                <path d="M57.2392 2.34164C57.4786 1.60459 58.5214 1.60459 58.7608 2.34164L60.0655 6.35704C60.1726 6.68666 60.4798 6.90983 60.8264 6.90983H65.0484C65.8234 6.90983 66.1456 7.90152 65.5186 8.35704L62.1029 10.8387C61.8226 11.0424 61.7052 11.4035 61.8123 11.7331L63.117 15.7485C63.3565 16.4856 62.5129 17.0985 61.8859 16.643L58.4702 14.1613C58.1898 13.9576 57.8102 13.9576 57.5298 14.1613L54.1141 16.643C53.4871 17.0985 52.6435 16.4856 52.883 15.7485L54.1877 11.7331C54.2948 11.4035 54.1774 11.0424 53.8971 10.8387L50.4814 8.35704C49.8544 7.90152 50.1766 6.90983 50.9516 6.90983H55.1736C55.5202 6.90983 55.8274 6.68666 55.9345 6.35704L57.2392 2.34164Z" fill="#67E776" />
                                                <path d="M81.2392 2.34164C81.4786 1.60459 82.5214 1.60459 82.7608 2.34164L84.0655 6.35704C84.1726 6.68666 84.4798 6.90983 84.8264 6.90983H89.0484C89.8234 6.90983 90.1456 7.90152 89.5186 8.35704L86.1029 10.8387C85.8226 11.0424 85.7052 11.4035 85.8123 11.7331L87.117 15.7485C87.3565 16.4856 86.5129 17.0985 85.8859 16.643L82.4702 14.1613C82.1898 13.9576 81.8102 13.9576 81.5298 14.1613L78.1141 16.643C77.4871 17.0985 76.6435 16.4856 76.883 15.7485L78.1877 11.7331C78.2948 11.4035 78.1774 11.0424 77.8971 10.8387L74.4814 8.35704C73.8544 7.90152 74.1766 6.90983 74.9516 6.90983H79.1736C79.5202 6.90983 79.8274 6.68666 79.9345 6.35704L81.2392 2.34164Z" fill="#67E776" />
                                                <path d="M105.239 2.34164C105.479 1.60459 106.521 1.60459 106.761 2.34164L108.066 6.35704C108.173 6.68666 108.48 6.90983 108.826 6.90983H113.048C113.823 6.90983 114.146 7.90152 113.519 8.35704L110.103 10.8387C109.823 11.0424 109.705 11.4035 109.812 11.7331L111.117 15.7485C111.356 16.4856 110.513 17.0985 109.886 16.643L106.47 14.1613C106.19 13.9576 105.81 13.9576 105.53 14.1613L102.114 16.643C101.487 17.0985 100.644 16.4856 100.883 15.7485L102.188 11.7331C102.295 11.4035 102.177 11.0424 101.897 10.8387L98.4814 8.35704C97.8544 7.90152 98.1766 6.90983 98.9516 6.90983H103.174C103.52 6.90983 103.827 6.68666 103.934 6.35704L105.239 2.34164Z" fill="#67E776" />
                                            </svg>
                                            <div>
                                                <p className='text-[#777] pt-3'>
                                                    {data.client}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                )
            }

            {/* Call to Action */}
            <section className="text-white py-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold">{callToAction.title}</h2>
                <p className="mt-4 text-sm md:text-base">{callToAction.content}</p>
                <button className="mt-6 px-6 py-3 bg-[#A100FF] text-white rounded-lg">{callToAction.cta}</button>
                <img src={callToAction.image} alt="" className="mt-6 mx-auto md:w-1/2 object-cover object-top max-h-[400px]" />
            </section>
            <Footer />

        </div>
    );
};

export default PageLayout;
