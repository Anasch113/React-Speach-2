import { useState } from 'react';
import DashboardLayout from '../../components/layout/dashboard-layout/DashboardLayout';

const UploadFiles = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [audioFileName, setAudioFileName] = useState('');
    const [textFile, setTextFile] = useState(null);
    const [textFileName, setTextFileName] = useState('');

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        setAudioFile(file);
        setAudioFileName(file ? file.name : '');
    };

    const handleTextChange = (event) => {
        const file = event.target.files[0];
        setTextFile(file);
        setTextFileName(file ? file.name : '');
    };

    const handleResync = () => {
        // Add your resync logic here
        console.log('Resync clicked');
        console.log('Audio File:', audioFile);
        console.log('Text File:', textFile);
    };

    return (
        <DashboardLayout>
            <div className="flex-grow p-4">
                <div className="bg-black bg-opacity-50 flex justify-center items-center z-50 px-2 md:px-0 mt-[200px]">
                    <div className="bg-gray-900 text-white p-6 rounded-md shadow-md max-w-md w-full relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className="mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path>
                                </svg>
                                Upload Files
                            </h2>
                            <button className="text-gray-400 hover:text-gray-200"></button>
                        </div>
                        <div className="flex flex-col md:flex-row cursor-pointer">
                            <div className="mb-4 h-full cursor-pointer md:mr-3">
                                <div className="bg-gray-800 p-4 rounded-md flex flex-col items-center justify-center w-full md:w-[200px] cursor-pointer">
                                    <input type="file" accept="audio/*" className="hidden" id="audio-upload" onChange={handleAudioChange} />
                                    <label htmlFor="audio-upload" className="w-full h-full text-center flex flex-col justify-center items-center cursor-pointer">
                                        <span>Upload Audio File</span>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className="cursor-pointer" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M64 464H320c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM192 272V400c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5L129.4 376H112c-8.8 0-16-7.2-16-16V312c0-8.8 7.2-16 16-16h17.4l35.3-35.3c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8zm85.8-4c11.6 20 18.2 43.3 18.2 68s-6.6 48-18.2 68c-6.6 11.5-21.3 15.4-32.8 8.8s-15.4-21.3-8.8-32.8c7.5-12.9 11.8-27.9 11.8-44s-4.3-31.1-11.8-44c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8z"></path>
                                        </svg>
                                    </label>
                                    {audioFileName && <p className="mt-2 text-gray-300">{audioFileName}</p>}
                                </div>
                            </div>
                            <div className="mb-4 h-full cursor-pointer">
                                <div className="bg-gray-800 p-4 rounded-md flex flex-col items-center justify-center w-full md:w-[200px] cursor-pointer">
                                    <input type="file" accept=".txt,.pdf" className="hidden" id="text-upload" onChange={handleTextChange} />
                                    <label htmlFor="text-upload" className="w-full h-full text-center flex flex-col justify-center items-center cursor-pointer">
                                        <span>Upload Text File</span>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className="cursor-pointer" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path>
                                        </svg>
                                    </label>
                                    {textFileName && <p className="mt-2 text-gray-300">{textFileName}</p>}
                                </div>
                            </div>
                        </div>
                        <button className="bg-[#a100ff]  rounded-md py-3 w-full" onClick={handleResync}>
                            Resync
                        </button>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default UploadFiles;
