import { Button } from '@/components/ui/button'
import React from 'react'
import jsPDF from 'jspdf';


const DownloadCaseNote = ({
    transcriptions,
    audioUrl,
    tasks,
    notes

}) => {
    console.log("summary", transcriptions.summary)
    console.log("tasks", tasks)
    console.log("notes", notes)
    console.log("audioUrl", audioUrl)

    // Downloading of audio url 


    const downloadAudio = async () => {


        try {

            const response = await fetch(audioUrl)
            const blob = await response.blob();
            const link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob)
            link.download = "caseNote_audio"
            link.target = ("_blank")

            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link);
           



        } catch (error) {
            console.log("Erro while downloading the audio", error)
        }
    }


    // Downloading Summary PDF
    const downloadSummary = () => {
        const doc = new jsPDF();
        const fontSize = 12;
        doc.setFontSize(fontSize);
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - 20;
        const textLines = doc.splitTextToSize(transcriptions.summary, maxWidth);
        doc.text(textLines, 10, 10);
        doc.save(`${transcriptions.filename}_summary.pdf`);
    };

    // Downloading Notes PDF
    const downloadNotes = () => {
        const doc = new jsPDF();
        const fontSize = 12;
        doc.setFontSize(fontSize);
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - 20;

        // Join the notes array into a single string
        const notesText = notes.join('\n');
        const textLines = doc.splitTextToSize(notesText, maxWidth);
        doc.text(textLines, 10, 10);
        doc.save(`${transcriptions.filename}_notes.pdf`);
    };

    // Downloading Tasks PDF
    const downloadTasks = () => {
        const doc = new jsPDF();
        const fontSize = 12;
        doc.setFontSize(fontSize);
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - 20;

        // Join the tasks array into a single string
        const tasksText = tasks.join('\n');
        const textLines = doc.splitTextToSize(tasksText, maxWidth);
        doc.text(textLines, 10, 10);
        doc.save(`${transcriptions.filename}_tasks.pdf`);
    };
    return (


        <div className='border w-[500px] min-h-[300px]  bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>
            <span span className='flex flex-col w-full justify-end gap-2 ' >

                <h1 className='md:text-xl text-xl font-semibold flex-1  text-center'>More Options</h1>


                <div className='flex flex-col gap-5 min-h-[150px] w-2/5'>
                    <Button onClick={downloadAudio} variant={"customPurple"}>Download Audio</Button>
                    <Button onClick={downloadSummary} variant={"customPurple"}>Download Summary</Button>
                    <Button onClick={downloadNotes} variant={"customPurple"}>Download Notes</Button>
                    <Button onClick={downloadTasks} variant={"customPurple"}>Download Tasks</Button>
                </div>
            </span >
        </div>
    )
}

export default DownloadCaseNote
