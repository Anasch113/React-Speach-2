import React from 'react'
import narrative from "../../assets/narrative.png"
import pageLine from "../../assets/pageLine.png"
const Types = ({
    hanldeStepOne
}) => {

    const typesDetail = [
        {
            title: "Narrative deposition summary",
            icon: narrative,
            description: "Generate a deposition summary in narrative format from a transcript.",
            type: "narrative"
        },
        {
            title: "Page-line deposition summary",
            icon: pageLine,
            description: "Generate a short or longer page-line deposition summary from a deposition.",
            type: "pageLine"
        }
    ]
    return (

        <div className='flex md:flex-row flex-col items-center justify-center gap-3'>
            {
                typesDetail.map((data, i) => (
                    <div
                        onClick={() => {
                            hanldeStepOne(data.type)
                        }}

                        key={i}
                        className='md:w-2/5 w-full h-80 bg-bg-navy-blue rounded-2xl border p-16 flex items-center justify-center flex-col gap-5 hover:cursor-pointer hover:bg-bg-navy-blue/75'>

                        <span className='md:text-lg font-semibold'>
                            {data.title}
                        </span>

                        <span className='md:w-20 md:h-20 w-16 h-16 p-5 rounded-full border text-center bg-bg-blue'>
                            <img className='' src={data.icon} alt="img" />
                        </span>

                        <span className=' max-[500px]:text-sm flex items-center justify-center'>
                            <p className='text-center'>{data.description}</p>
                        </span>

                    </div>
                ))
            }
        </div>


    )
}

export default Types
