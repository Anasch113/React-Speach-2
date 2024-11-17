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
            <h1 className='large-title' >
                {data.title}

            </h1>
            <p className='small-title'>By: {data.author}</p>

            <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className="p-5 bg-bg-navy-blue min-h-[500px] w-full rounded-xl flex flex-col "
            />
            <BlogComments
                blogId={id}
            />


        </div>
    )
}

export default Singleblog
