import React from 'react'
import { faqData } from '../../../../data/documentationData/data'
const FaqsAndTroubleShot = () => {
    return (
        <div className='flex flex-col ml-5 my-2 border p-5 bg-bg-navy-blue rounded-xl gap-5'>
            <p className='large-title'>Troubleshooting and FAQs</p>
            {
                faqData.map((data, i) => (
                    <div key={i} className='flex flex-col gap-2 p-2'>


                        <p className='small-title'>{data.title}</p>
                        {
                            data.points.map((point, j) => (
                                <span key={j} className='flex flex-col gap-2'>
                                    <p className='my-2'> {point.description}</p>
                                    {

                                    }
                                    <p className='my-2'> {point.ans}</p>

                                </span>
                            ))
                        }


                    </div>
                ))

            }

        </div>
    )
}

export default FaqsAndTroubleShot
