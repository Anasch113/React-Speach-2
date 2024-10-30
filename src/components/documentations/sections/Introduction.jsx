import React from 'react'
import { introductionData } from '../../../../data/documentationData/data'
const Introduction = () => {
  return (
    <div className='flex flex-col ml-5 my-2 border p-5 bg-bg-navy-blue rounded-xl gap-5'>
      {
        introductionData.map((data, i) => (
          <div key={i} className='flex flex-col gap-2 p-2'>


            <p className='small-title'>{data.title}</p>
            <span className='flex flex-col'>
              <p>{data.description}</p>



            </span>

          </div>
        ))

      }


    </div>
  )
}

export default Introduction
