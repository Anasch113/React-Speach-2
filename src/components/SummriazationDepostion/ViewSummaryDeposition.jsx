import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewSummaryDeposition = () => {

  const [transcriptions, setTranscriptions] = useState(false)

  const { id } = useParams();

  console.log("id in view summary depositon page", id)


  useEffect(() => {

    const fetchSingleTranscription = async () => {

      const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/sd/fetch-single`, { id: id }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch((err) => {
        console.log("Error while fetching the transcription in view transcriptions", err)
      })
      const transcription = fetch.data;
      setTranscriptions(transcription)

    }



    fetchSingleTranscription()

  }, [id])

  console.log("transcriptions:", transcriptions)


  return (
    <div className='w-full min-h-screen flex items-center justify-center p-5'>
      
   
        {


          transcriptions.depositionType === "pageLine" ? (
            <div>
            <h1 className='text-2xl font-bold font-poppins my-5'>Page Line Summary</h1>
            <table className='w-full p-10 min-h-screen '>
              <thead>
                <tr className='flex w-full items-center justify-between p-5'>
                  <th className='w-1/3 text-left text-lg'>Timestamp</th>
                  <th className='w-1/3 text-left text-lg'>Title</th>
                  <th className='w-1/3 text-left text-lg'>Summary</th>
                </tr>
              </thead>
              <tbody>

                {transcriptions.segments && transcriptions.segments.map((segment, index) => (
                  <tr key={index} className='flex w-full items-center justify-between gap-10 border p-5'>

                    <td className='w-1/3 my-5'>{transcriptions.timestamps[index]}</td>
                    <td className='w-1/3 my-5 '>{segment}</td>
                    <td className='w-1/3 my-5'>{transcriptions.summaries[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div className=' p-5 '>
              <h1 className='text-2xl font-bold font-poppins my-5'>Narrative Summary</h1>
              {transcriptions.narrativeSummary}</div>
          )
        }


      </div>



    
  )
}

export default ViewSummaryDeposition
