import { useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import * as pdfjs from 'pdfjs-dist';


export function uploadingFunctions() {

    const [file, setFile] = useState(null)
    const [filename, setFileName] = useState("No File Selected")
    const [cloudUrl, setCloudUrl] = useState("")
    const [fileContent, setFileContent] = useState("")
    const [progress, setProgress] = useState(0)
    const [isUpload, setIsUpload] = useState(false)
    const [cloudUrls, setCloudUrls] = useState([]);
    const [fileDurations, setFileDurations] = useState([]);
    const [cost, setCost] = useState(0);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [uploadingfileNames, setUploadingFileNames] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [chunksLoading, setChunksLOading] = useState(false)
    const [fileDuration, setFileDuration] = useState(0);
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false)

    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/db9lgwk1d";

    const CLOUD_NAME = 'db9lgwk1d';
    const UPLOAD_PRESET = 'iy2lwq5b';



    // Bulk file experiment start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const handleFileChange = async (event) => {
        setIsUpload(true);
        setCloudUrls("");
        setFile("");
        setFileDurations("");
        setCost(0)
        setProgress(0);

        const selectedFiles = event.target.files;
        console.log('Selected Files:', selectedFiles);

        const fileUploadPromises = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            fileUploadPromises.push(uploadAndTranscribeFile(file, i));
        }

        try {
            // Wait for all file uploads to complete
            await Promise.all(fileUploadPromises);
            toast.success("All files uploaded ");

            setShowFormModal(false)
            setShowPaymentModal(true)

        } catch (error) {
            alert(error);
            console.error("Error in uploading files", error.message);
        }

        setIsUpload(false);



    };





    const uploadAndTranscribeFile = async (file, index) => {
        setFile(file);

        setUploadingFileNames((prevNames) => [...prevNames, file.name]);
        try {
            const isLargeFile = file.size > 20 * 1024 * 1024; // 20MB
            if (isLargeFile) {
                // Handle large file upload with chunking (return a promise that resolves when complete)
                return uploadFile(file, index);
            } else {


                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", UPLOAD_PRESET);
                formData.append("cloud_name", CLOUD_NAME);
                formData.append("folder", "Audio");
                formData.append("quality", "auto:good"); // Set the desired quality level

                const cloudinaryResponse = await axios.post(
                    `${cloudinaryBaseUrl}/upload`,
                    formData,

                    {
                        onUploadProgress: (progressEvent) => {
                            const progressPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                            setProgress((prevProgress) => {
                                // If prevProgress is not an array, default to an empty array
                                const newProgress = Array.isArray(prevProgress) ? [...prevProgress] : [];
                                newProgress[index] = progressPercentage;
                                return newProgress;
                            });
                            console.log(`Upload Progress for ${file.name}: ${progressPercentage}%`);
                        }
                    }

                );

                const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;
                setFileNames((prevNames) => [...prevNames, file.name]);
                setCloudUrls((prevUrls) => [...prevUrls, cloudinaryFileUrl])

                const duration = cloudinaryResponse.data.duration;
                const roundedDuration = (duration / 60).toFixed(1);
                setFileDurations((prevDurations) => [...prevDurations, roundedDuration]);
                // console.log("cloudinaryResponse:", cloudinaryResponse);
                // console.log("cloudinary URL:", cloudinaryFileUrl);
                toast.success(`File ${file.name} uploaded`);



                //   Calculate the cost

                const cost = (roundedDuration * 0.5).toFixed(2);
                console.log("cost", cost)
                setCost((prevCost) => parseFloat(prevCost) + parseFloat(cost));


                setIsPaymentInProgress(true)



                // Call your transcription function here
                // await transcribeFile(cloudinaryFileUrl);
            }
        } catch (error) {
            console.error(`Error in uploading file ${file.name}`, error.message);
        }
    };


    // Bulk file experiment end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const uploadFile = (file) => {
        return new Promise(async (resolve, reject) => {
            if (!file) {
                console.error('Please select a file.');
                reject('No file selected.');
                return;
            }

            setChunksLOading(true);
            const uniqueUploadId = generateUniqueUploadId();
            const chunkSize = 5 * 1024 * 1024;
            const totalChunks = Math.ceil(file.size / chunkSize);
            let currentChunk = 0;

            console.log("total chunks", totalChunks);

            const uploadChunk = async (start, end) => {
                const formData = new FormData();
                formData.append('file', file.slice(start, end));
                formData.append('cloud_name', CLOUD_NAME);
                formData.append('upload_preset', UPLOAD_PRESET);
                const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

                console.log(`Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${end - 1}`);

                try {
                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
                        {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'X-Unique-Upload-Id': uniqueUploadId,
                                'Content-Range': contentRange,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Chunk upload failed.');
                    }

                    currentChunk++;

                    if (currentChunk < totalChunks) {
                        const nextStart = currentChunk * chunkSize;
                        const nextEnd = Math.min(nextStart + chunkSize, file.size);

                        // Update the progress percentage
                        const progress = Math.round((currentChunk / totalChunks) * 100);
                        console.log("Progress during chunk file upload:", progress);
                        toast(`In progress, ${file.name && file.name} ${progress}% uploaded `, { icon: '👏' });

                        await uploadChunk(nextStart, nextEnd); // Ensure the next chunk is awaited
                    } else {
                        const fetchResponse = await response.json();
                        const cloudinaryFileUrl = fetchResponse.secure_url;
                        setFileNames((prevNames) => [...prevNames, file.name]);
                        setCloudUrls((prevUrls) => [...prevUrls, cloudinaryFileUrl]);
                        toast.success("Audio file uploaded");

                        const duration = fetchResponse.duration;
                        const roundedDuration = (duration / 60).toFixed(1);
                        setFileDurations((prevDurations) => [...prevDurations, roundedDuration]);

                        const cost = (roundedDuration * 0.5).toFixed(2);
                        console.log("Cost:", cost);
                        setCost((prevCost) => parseFloat(prevCost) + parseFloat(cost));

                        setChunksLOading(false);
                        resolve(); // Resolve the promise when done
                    }
                } catch (error) {
                    console.error('Error uploading chunk:', error);
                    reject(error); // Reject the promise on error
                }
            };

            const start = 0;
            const end = Math.min(chunkSize, file.size);
            uploadChunk(start, end);
        });
    };





    const generateUniqueUploadId = () => {
        return `uqid-${Date.now()}`;
    };


    console.log("duration of uploaded file", fileDuration)




    // uplaoding text file 



    const handleTextFileChange = async (event) => {
        setIsUpload(true);
        setCloudUrls("");
        setFile("");
        setFileDurations("");
        setCost(0);
        setProgress(0);

        const selectedFiles = event.target.files;
        console.log('Selected Files:', selectedFiles);

        const fileUploadPromises = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            fileUploadPromises.push(uploadAndProcessTextFile(file, i));
        }

        try {
            // Wait for all file uploads to complete
            await Promise.all(fileUploadPromises);
            toast.success("All files uploaded ");


        } catch (error) {
            alert(error);
            console.error("Error in uploading files", error.message);
        }

        setIsUpload(false);
    };


    const uploadAndProcessTextFile = async (file, index) => {
        setFile(file);
        setIsUpload(true)
        setUploadingFileNames((prevNames) => [...prevNames, file.name]);
        setCost(10)


        try {
            // Check if the uploaded file is a text file
            if (file.type === "text/plain") {
                const reader = new FileReader()

                reader.onload = async (e) => {
                    const fileContent = e.target.result;

                    // Perform further processing with the text content
                    console.log("Text file content:", fileContent);


                    setFileContent(fileContent)


                    // Update UI or state as needed
                    setFileNames((prevNames) => [...prevNames, file.name]);
                    setProgress((prevProgress) => {
                        const newProgress = Array.isArray(prevProgress) ? [...prevProgress] : [];
                        newProgress[index] = 100;
                        return newProgress;
                    });

                    setIsPaymentInProgress(true);
                    setShowPaymentModal(true)
                };

                reader.onerror = (error) => {
                    console.error(`Error reading text file ${file.name}`, error);
                    toast.error(`Failed to read file ${file.name}`);
                };

                // Read the file content as text
                reader.readAsText(file);

            }
            else if (file.type === "application/pdf") {
                // Handle PDF file
                const fileReader = new FileReader();

                fileReader.onload = async (e) => {
                    const typedArray = new Uint8Array(e.target.result);
                    const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
                    let textContent = '';

                    // Extract text from each page
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContentPage = await page.getTextContent();
                        textContentPage.items.forEach((item) => {
                            textContent += item.str + ' ';
                        });
                    }

                    setFileContent(textContent)
                };

                fileReader.onerror = (error) => {
                    console.error(`Error reading PDF file ${file.name}`, error);
                    toast.error(`Failed to read PDF file ${file.name}`);
                };

                fileReader.readAsArrayBuffer(file);

            }

            else {
                throw new Error("Uploaded file is not a text file");
            }

        } catch (error) {
            console.error(`Error in uploading or processing file ${file.name}`, error.message);
            toast.error(`Failed to process file ${file.name}`);
        }
    };

    return {
        file, setFile, filename, setFileName, cloudUrl, setCloudUrl, progress, setProgress, isUpload, setIsUpload, cloudUrls, setCloudUrls, fileDurations, setFileDurations, cost, setCost, showFormModal, setShowFormModal, showPaymentModal, setShowPaymentModal, uploadingfileNames, setUploadingFileNames, fileNames, setFileNames, chunksLoading, setChunksLOading, handleFileChange, fileDuration, isPaymentInProgress, setIsPaymentInProgress, handleTextFileChange, fileContent, setFileContent
    }
}

