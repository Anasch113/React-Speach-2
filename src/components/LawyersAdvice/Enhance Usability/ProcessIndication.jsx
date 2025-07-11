import React from 'react'

const ProcessIndication = () => {
  return (
    <div className='flex items-center gap-3 p-4 w-full'>
     <p className='text-lg font-semibold'>Case Note in progress</p> 
     <div className='spinner'></div>
    </div>
  )
}

export default ProcessIndication
