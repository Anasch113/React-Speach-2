import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { CiFlag1 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import toast from 'react-hot-toast';



const Tasks = ({

    tasksData

}) => {


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> States Declaration >>>>>>>>>>>>>>>>>>>>>>


    console.log("tasksData state", tasksData)

    // const handleMicrosoftAuthentication = () => {
    //     window.location.href = `${import.meta.env.VITE_HOST_URL}/tasks/ms-login`;
    // };
    return (


        <div className='border w-full min-h-[450px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5 max-h-[650px] overflow-y-auto'>
            <span className='flex items-center w-full justify-end '>

                <h1 className='md:text-3xl text-xl font-semibold flex-1  text-center'>Tasks</h1>
                

                {/* <Dialog>
                    <DialogTrigger asChild>
                        <Button onClick={hanldeTasks} variant="outline">Generate Task</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Task</DialogTitle>
                            <DialogDescription>
                                You can add your new note here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">

                                <Input id="name" value="Title" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">

                                <Textarea id="username" value="Descriptions points" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog> */}

            </span>


            <div className='flex gap-4 rounded-md w-full p-2 min-h-[150px] text-sm md:text-base flex-wrap'>


                {
                    tasksData.length > 0 && tasksData.map((task, i) => (
                        <div key={i} className='w-2/5 border min-h-[240px]  rounded-2xl p-4 flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>

                                <p className='text-lg font-semibold'>Task title</p>

                                <span className='flex flex-row gap-1 items-center'>
                                    <span className='border  p-3 rounded-full  hover:bg-blackGray hover:cursor-pointer'>

                                        <TiPencil className='text-lg' />
                                    </span>

                                    <span className='border  p-3 rounded-full  hover:bg-blackGray hover:cursor-pointer'>

                                        <RiDeleteBin6Line className='text-lg' />
                                    </span>
                                </span>

                            </div>


                            <span className='border-b text-sm pb-3'>
                                {
                                    task
                                }
                            </span>


                            <span className='flex w-full justify-between items-center'>

                                <p className='text-sm'>August 3 2024</p>
                            </span>

                        </div>

                    ))
                }



                {
                    tasksData.length === 0 && <div>
                        <p className='text-lg font-bold text-center'>No tasks available</p>
                    </div>
                }


            </div>






        </div>
    )
}

export default Tasks
