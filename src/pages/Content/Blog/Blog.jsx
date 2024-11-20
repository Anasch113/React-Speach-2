
import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { FaRegUserCircle } from "react-icons/fa"
const Blog = () => {



  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/blog/get-all-blogs`);
        setBlogs(response.data.blogs);

      } catch (error) {
        console.error("Error fetching blogs:", error);

      }
    };

    fetchBlogs();
  }, []);


  console.log("blogs:", blogs)

  const handleNavigate = (id) => {
    navigate(`/blog/${id}`)
  }
  return (


    <div className='blog-bg min-h-screen w-full p-5 flex flex-col gap-5 items-center justify-center
    '>
      <div className=' w-full flex flex-col justify-center items-center  gap-5 p-5'>
        <p className='md:normal-title text-white text-center  small-title'  >
          BLOG
        </p>

        <p className='md:text-4xl text-2xl font-poppins font-bold'>
          Keep up with the latest in AI
        </p>

        <p className='small-title text-gray-500 md:w-2/4 w-full text-center '>
          Stay up to date with product news, company news, the latest AI research, and Captify tutorials.
        </p>

      </div>



      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {blogs.map((blog) => (

          <div

            onClick={() => {
              handleNavigate(blog._id)
            }} key={blog._id}

            className="bg-bg-navy-blue flex flex-col p-3 rounded-xl shadow-md hover:cursor-pointer hover:bg-blackGray/70 transition-colors">

            <span className='rounded-md my-4 '>
              <img className=' w-full md:h-60 h-40' src={blog.titleImageUrl} alt="titleImage" />
            </span>

            <span>
              <p className="text-gray-400 my-4 font-poppins">{` ${new Date(blog.createdAt).toLocaleDateString()}`}</p>
            </span>

            <h2 className="text-2xl font-semibold my-3">{blog.title}</h2>

            <p className="text-gray-400 mb-2 font-poppins-2">By: {blog.author}</p>

          </div>
        ))}
      </div>




    </div>
  )
}

export default Blog
