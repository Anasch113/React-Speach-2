import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaLink, FaTimes } from 'react-icons/fa';
import { FaShare } from "react-icons/fa";
const BlogShare = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl).then(() => {
      setIsCopy(true)
      toast.success("Link copied to clipboard!");
    });
  };


  const blogUrl = `https://captifylive.online/blog/${id}`;


  return (
    <div>
      {/* Share Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className=" flex  items-center  gap-2 bg-bg-purple-2  text-white py-3 px-4 rounded-xl hover:bg-bg-purple-2/90"
      >
        Share
        <FaShare />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bg-navy-blue rounded-md p-6 w-11/12 md:w-1/3 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-semibold mb-4">Share This Blog</h2>
            <p className="text-white-700 mb-4">
              Copy the link below to share this blog:
            </p>

            {/* Blog URL */}
            <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between mb-4">
              <p className="text-gray-900  truncate">{blogUrl}</p>
              <FaLink className="" />
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="w-full bg-bg-purple-2 text-white py-2 px-4 rounded-md hover:bg-bg-purple-2/50"
            >
              {isCopy ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogShare;
