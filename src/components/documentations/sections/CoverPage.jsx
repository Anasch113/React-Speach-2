import React from 'react'
import { coverPageData } from '../../../../data/documentationData/data'
import Markdown from 'react-markdown'
const CoverPage = () => {
  return (

    <div className='flex flex-col ml-5 my-2 border p-5 bg-bg-navy-blue rounded-xl gap-5'>
      <img className='w-40' src={coverPageData.logo} alt="" />

      <span className='flex gap-2 items-center large-title'> {coverPageData.title}</span>
      <span className='flex gap-2 items-center '> Publish Date: {coverPageData.docDate}</span>
      <span className='flex gap-2 items-center '>Version : {coverPageData.version}</span>

      <span>
        <p className='small-title'>Contact</p>
        <span className='flex flex-col'>
          <p>{coverPageData.contactInfo.email}</p>
          <p>{coverPageData.contactInfo.address}</p>
        </span>


      </span>


    </div>

  )
}

export default CoverPage
