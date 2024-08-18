import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import React from 'react'

const ParametersBox = ({
    showSpeakerLabels,
    showNotes,
    handleSwitchChange,
    isEdit,
    showTasks,
    showSummary
}) => {


    return (
        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>
            <h1 className='md:text-3xl text-xl font-semibold'>Parameters</h1>

            <span className='w-full'>

                <Input className='px-3 py-2 md:w-2/4 rounded-2xl outline-4 outline-blue-500' placeholder="Clients Name" />
            </span>

            <div className='flex flex-col gap-4 w-full'>

                <span className='flex gap-2 w-full'>

                    <span className='flex gap-3 items-center space-x-2 border p-2 w-2/4 rounded-2xl'><Switch checked={showSpeakerLabels} onCheckedChange={() => handleSwitchChange("speakerLabels")} />Speaker Labels</span>

                    <span className='flex gap-3 items-center space-x-2 border p-2 w-2/4 rounded-2xl'><Switch checked={showNotes} onCheckedChange={() => handleSwitchChange("notes")} />Notes</span>
                </span>
                <span className='flex gap-2 w-full'>
                    <span className='flex gap-3 items-center space-x-2 border p-2 w-2/4 rounded-2xl'><Switch  checked={isEdit} onCheckedChange={() => handleSwitchChange("edit")}/>Edit Transcript</span>

                    <span className='flex gap-3 items-center space-x-2 border p-2 w-2/4 rounded-2xl'><Switch checked={showTasks} onCheckedChange={() => handleSwitchChange("tasks")} />Tasks</span>


                 
                </span>
                <span className='flex gap-2 w-full'>
                <span className='flex gap-3 items-center space-x-2 border p-2 w-2/4 rounded-2xl'><Switch checked={showSummary} onCheckedChange={() => handleSwitchChange("summary")} />Summary</span>
                </span>


            </div>
        </div>
    )
}

export default ParametersBox
