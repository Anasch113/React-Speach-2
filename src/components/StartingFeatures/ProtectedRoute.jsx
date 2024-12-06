import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import toast from 'react-hot-toast';
import { database } from '@/firebase';
import { ref, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import Spinner from '../PreAudio/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const [loginAccess, setLoginAccess] = useState(null); // Holds the real-time value of loginAccess
  const [isMfaActive, setIsMfaActive] = useState(null); // Holds the real-time value of loginAccess
  const [method, setMethod] = useState(null); // Holds the real-time value of loginAccess
  // const { isMfaActive } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const dataBaseRef = ref(database, `users/${user.uid}/mfa`);

      // Real-time listener for loginAccess updates
      const unsubscribe = onValue(dataBaseRef, (snapshot) => {
        const mfaData = snapshot.val();
        console.log("Real-time MFA data in ProtectedRoute:", mfaData);

        if (mfaData) {
          setLoginAccess(mfaData.loginAccess);
          setIsMfaActive(mfaData.isMfaActive)
          setMethod(mfaData.method)
        } else {
          setLoginAccess(false); // Default to false if no data is found
        }
      });
      

      // Cleanup the listener on component unmount
      return () => unsubscribe();
    }
  }, [user]);

  console.log("loginaccess", loginAccess)

  // Handle cases where loginAccess is still being determined
  if (loginAccess === null) {
    return <div className='flex items-center justify-center'><Spinner/></div>; // Show a loading spinner or placeholder
  }

  // Redirect based on MFA and login access
  if (isMfaActive && !loginAccess) {
    toast.error("MFA required");
    return <Navigate to={`/mfa?method=${method}`} />; // Adjust the query param based on the MFA method
  }

  if (!user) {
    toast.error("Login failed");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
