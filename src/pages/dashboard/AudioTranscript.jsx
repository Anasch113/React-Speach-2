import { useState } from 'react';
import DashboardLayout from '../../components/layout/dashboard-layout/DashboardLayout';

const TranscribeFiles = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [language, setLanguage] = useState('English');
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile ? selectedFile.name : '');
    };
  
    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Add your form submission logic here
      console.log('File:', file);
      console.log('Language:', language);
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-black flex items-center justify-center p-4 md:pt-[50px]">
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl h-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
                            </svg>
                            Transcribe Files
                        </h2>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="border border-blue-500 rounded-lg p-4 flex flex-col items-center justify-center text-center h-[280px]">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="text-blue-500 mb-2" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
                                    </svg>
                                    <span className="text-gray-400">Upload Audio File</span>
                                </div>
                            </label>
                            <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                            {fileName && <p className="mt-2 text-gray-300">{fileName}</p>}
                        </div>
                        <div>
                            <label htmlFor="language" className="block mb-2">Audio Language</label>
                            <select id="language" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" value={language} onChange={handleLanguageChange}>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-[#460073] py-2 flex justify-center items-center">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="mr-3" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
                            </svg>
                            Transcribe
                        </button>
                    </form>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default TranscribeFiles;
