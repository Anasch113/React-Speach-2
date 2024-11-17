
import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
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


    <div className='min-h-screen w-full p-5 flex flex-col gap-5 items-center justify-center
    '>
      <h1 className='font-poppins text-3xl font-semibold text-white  ml-10 my-5 text-center'  >
        Our Blogs
      </h1>


      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div onClick={() => {
            handleNavigate(blog._id)
          }} key={blog._id} className="bg-blackGray p-6 rounded-xl shadow-md hover:cursor-pointer hover:bg-blackGray/70 transition-colors">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-400 mb-2">By: {blog.author}</p>
            <p className="text-gray-400 mb-2">{`Date: ${new Date(blog.createdAt).toLocaleDateString()}`}</p>
          </div>
        ))}
      </div>



    </div>
  )
}

export default Blog
