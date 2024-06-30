/* eslint-disable react/prop-types */
import { useState } from "react";

const FilterButtons = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row relative mt-24">
                <button
                    className={`w-full text-2xl flex pl-5 border-white text-white py-4 bg-transparent border-l-0 border-t ${activeSection === 'topics' ? 'border-y-0' : 'border-y'}`}
                    onClick={() => toggleSection('topics')}
                >
                    {activeSection === 'topics' ? '- Topic' : '+ Topic'}
                </button>
                <button
                    className={`w-full text-2xl flex pl-5 border-white text-white py-4 bg-transparent border-t ${activeSection === 'industries' ? 'border-y-0' : 'border-y'}`}
                    onClick={() => toggleSection('industries')}
                >
                    {activeSection === 'industries' ? '- Industry' : '+ Industry'}
                </button>
                <button
                    className={`w-full text-2xl flex pl-5 border-white text-white py-4 bg-transparent border-t ${activeSection === 'contentTypes' ? 'border-y-0' : 'border-y'}`}
                    onClick={() => toggleSection('contentTypes')}
                >
                    {activeSection === 'contentTypes' ? '- Content Type' : '+ Content Type'}
                </button>
            </div>
            {activeSection === 'topics' && <FilterOptions options={['Cloud', 'Cybersecurity', 'Learning', 'Metaverse', 'Strategy']} />}
            {activeSection === 'industries' && <FilterOptions options={['Aerospace & Defense', 'Automotive', 'Banking', 'Capital Markets', 'Chemicals', 'Energy']} />}
            {activeSection === 'contentTypes' && <FilterOptions options={['Blog', 'Case Study', 'Live Interview', 'Perspective', 'Podcast', 'Research Report']} />}
        </div>
    );
};

const FilterOptions = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionClick = (option) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(option)
                ? prevSelected.filter((item) => item !== option)
                : [...prevSelected, option]
        );
    };

    const isSelected = (option) => selectedOptions.includes(option);

    return (
        <div className="px-4 md:px-8">
            <div className="flex flex-wrap justify-start w-full gap-5 mt-10 ml-4">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className={`border border-slate-100 border-opacity-25 text-white bg-transparent text-lg hover:bg-gray-800 hover:text-white py-2 px-4 rounded flex items-center gap-x-1 justify-between ${
                            isSelected(option) ? 'bg-gray-800' : ''
                        }`}
                    >
                        {isSelected(option) && (
                            <svg
                                className="ml-2 w-5 h-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        )}
                        <span>{option}</span>
                    </button>
                ))}
            </div>
            <div className="flex items-center  justify-end mt-32 mr-2.5 gap-5">
                <button
                    className="text-lg text-white"
                    onClick={() => setSelectedOptions([])}
                >
                    Clear All
                </button>
                <button className="bg-purple-700 p-3 text-lg  text-white z-10">
                    Show Result
                </button>
            </div>
        </div>
    );
};

export default FilterButtons;
