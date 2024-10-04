



import MainLayout from '@/components/LawyersAdvice/RealtimeTranscriptAndSummary/MainLayout'
import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Notecase = () => {

  const navigate = useNavigate();
  const location = useLocation()




  


  return (


    <div className='min-h-screen w-full flex  '>

      <MainLayout />

    </div>
  )
}

export default Notecase
