import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
  try {
    let { user } = useUserAuth();

    if (!user || user.emailVerified === false) {
      Swal.fire("Unauthorized Way Detected", "Verify your Email or Login Correctly", "error")
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.log("Error in protected routes", error);
    toast.error("An error occurred. Please try again later.");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;