import React from 'react';

const Parallex = () => {
    const data = [
        {
            id: 1,
            bgColor: '#460073',
            heading: 'An Ethical Business Leader',
            text: '17 consecutive years as one of Ethispheres Worlds Most Ethical Companies.',
            text2: 'We strive to do the right thing and act as a powerful force for good.',
            link: '',
        },
        {
            id: 2,
            bgColor: '#e2062e',
            heading: 'A Great Place To Work',
            text: 'Number 10 on the world best workplace work list',
            text2: 'The recognition is based on Facebook our people measuring the level of Trust, Pride commodities at work',
            link: '',
        },
        {
            id: 3,
            bgColor: '#0041f0',
            heading: 'An Influential Innovator',
            text: 'Julie Sweet, our chair and CEO, is one of the TIME100 Most Influential People of 2024.',
            text2: 'Every day, Julie and all of us at Bradley Reporting help the world’s leading companies embrace continuous reinvention, with innovation and people at the center.',
            link: '',
        },
    ];

    return (
        <div className="min-h-screen mt-[20rem] bg-image backgroundImg1">
            <div className="pt-[100vh] pb-[50vh]">
                <div className="px-[10%]">
                    {data.map((e, index) => (
                        <div
                            key={index}
                            className={`w-full lg:w-1/2 text-white cursor-pointer h-[330px] overflow-hidden relative mb-10 lg:mb-0 ${e.id === 2 ? 'ml-auto' : ''} ${e.id === 3 ? 'mx-auto' : ''} group`}
                            style={{ backgroundColor: e.bgColor, marginTop: index === 0 ? '0' : '30vh' }}
                        >
                            <h1 className="text-3xl font-semibold absolute bottom-8 mx-8 group-hover:invisible">{e.heading}</h1>
                            <div className="absolute inset-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                <div className="h-full flex flex-col justify-center">
                                    <p className="font-semibold text-[18px]">{e.text}</p>
                                    <p className="font-semibold mt-1">{e.text2}</p>
                                    <button className="flex items-center justify-end text-[17px] text-right w-full mt-auto">
                                        <span className="hover-underline-animation">Expand</span>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Parallex;
