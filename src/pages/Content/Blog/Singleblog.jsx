import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import BlogComments from '@/components/content/BlogComments'

const Singleblog = () => {




    const { id } = useParams();
    console.log("id in view blog", id)

    const navigate = useNavigate()



    const [blogContent, setBlogContent] = useState('');
    const [data, setData] = useState('')





    useEffect(() => {
        const fetchBlogContent = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/blog/get-content/${id}`);
                setBlogContent(response.data.content);
                setData(response.data)

            } catch (error) {
                console.error("Error fetching blog content:", error);
            }
        };
        fetchBlogContent();
    }, [id]);

    console.log("blog content:", data,)

    return (
        <div className='min-h-screen w-full p-5 flex flex-col gap-5 items-center'>

            <span className='bg-bg-navy-blue rounded-xl w-full flex md:flex-row flex-col justify-between p-4 items-center'>
                <span className='flex flex-col gap-4 items-center'>
                <h1 className='md:text-4xl text-2xl font-poppins font-bold' >
                    {data.title}

                </h1>
              
                </span>
                
                <span className='rounded-md my-4 '>
                    <img className=' w-full md:h-60 h-40' src={data.titleImageUrl} alt="titleImage" />
                </span>
            </span>


            <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className="p-5  border-b min-h-[500px] w-full rounded-xl flex flex-col "
            />
            <BlogComments
                blogId={id}
            />


        </div>
    )
}

export default Singleblog
