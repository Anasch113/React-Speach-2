import React from 'react'
import Wrapper from '../layout/wrapper/Wrapper'
import Carousel from './CarouselReporting'

const Reporting = () => {
  return (
    <div className='md:min-h-screen md:mb-0 mb-20'>
        <Wrapper>
            <div className='md:mb-20'>
                <h1 className='text-2xl md:text-4xl text-white font-semibold  mt-40 '>Bradley Reporting News</h1>

            </div>
            <Carousel/>
        </Wrapper>
    </div>
  )
}

export default Reporting