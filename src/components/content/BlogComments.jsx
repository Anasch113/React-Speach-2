import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserAuth } from '@/context/UserAuthContext';
import toast from 'react-hot-toast';
const BlogComments = ({ blogId }) => {
    const { user } = useUserAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Fetch comments for the blog
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/blog/comments/${blogId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [blogId]);

    // Add a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/blog/add-comment`, {
                blogId,
                userId: user.uid,
                username: user.displayName,
                comment: newComment,
            });
            toast.success("comment added")
            // Update comments list locally
            setComments([response.data.comment, ...comments]);
            setNewComment("");
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <h3 className="text-xl font-bold font-poppins">Comments</h3>

            {/* Show input box if user is logged in */}
            {user ? (
                <div className="add-comment">
                    <textarea
                        className="w-full p-2 bg-bg-navy-blue rounded-xl min-h-[150px] outline-none"
                        rows="3"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        className="mt-2 p-2 bg-bg-purple-2 text-white rounded-lg"
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>
                </div>
            ) : (
                <p className="text-gray-600">Login to add a comment.</p>
            )}

            {/* List of comments */}
            <div className="comments-list mt-5">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment p-3 border-b">
                        <p className="font-semibold">{comment.username}</p>
                        <p>{comment.comment}</p>
                        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogComments;
