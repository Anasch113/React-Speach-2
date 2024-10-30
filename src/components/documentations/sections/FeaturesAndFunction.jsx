import React from 'react'
import { featuresData } from '../../../../data/documentationData/data'
const FeaturesAndFunction = () => {
    return (
        <div className='flex flex-col ml-5 my-2 border p-5 bg-bg-navy-blue rounded-xl gap-5'>
            <p className='large-title'>Features and Functions</p>
            {
                featuresData.map((data, i) => (
                    <div key={i} className='flex flex-col gap-2 p-2'>


                        <p className='normal-title'>{data.title}</p>
                        {
                            data.points.map((point, j) => (
                                <span key={j} className='flex flex-col'>
                                    <p>{point.description}</p>
                                    {/* {point.steps.map((data, k) => (
                                        <FunctionsSteps key={`project-${k}`} index={k} {...data} />
                                    ))} */}

                                </span>
                            ))
                        }


                    </div>
                ))
            }

        </div>
    )
}


const FunctionsSteps = ({
    index,
    name,
    description
}) => {
    return (
        <div className=' p-2 mt-3'>
            <span className='flex flex-col justify-center gap-1'>
                <p className='small-title'>{name}</p>
                <p className='small-title'>{description}</p>
            </span>

        </div>
    )

}
export default FeaturesAndFunction
