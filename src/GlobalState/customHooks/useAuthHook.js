import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {

    setIsMfaActive
} from "../features/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { database, auth } from "../../firebase";
import { useUserAuth } from "@/context/UserAuthContext";


export const useAuthHook = () => {
    const dispatch = useDispatch();
    const { user } = useUserAuth()



    // const checkMfaActive = () => {
    //     try {
    //         console.log("Fetching MFA details...");
    //         const dataBaseRef = ref(database, `users/${user?.uid}/mfa`);

    //         onValue(dataBaseRef, (snapshot) => {
    //             const mfaData = snapshot.val();
    //             console.log("MFA data fetched:", mfaData);

    //             if (mfaData?.isMfaActive === true) {
    //                 dispatch(setIsMfaActive(true));
    //             }

    //             return mfaData
    //         });


    //     } catch (error) {
    //         console.log("error while checking the MFA", error)
    //     }
    // }

    const checkMfaActive = () => {
        return new Promise((resolve, reject) => {
            try {
                console.log("Fetching MFA details...");
                const dataBaseRef = ref(database, `users/${user?.uid}/mfa`);

                onValue(

                    dataBaseRef,
                    (snapshot) => {
                        const mfaData = snapshot.val();
                        console.log("MFA data fetched:", mfaData);

                        if (mfaData?.isMfaActive === true) {
                            dispatch(setIsMfaActive(true));
                        }

                        resolve(mfaData); // Resolve the promise with fetched data
                    },
                    (error) => {
                        console.error("Error fetching MFA data:", error);
                        reject(error); // Reject the promise if there's an error
                    }
                );
            } catch (error) {
                console.log("Error while checking the MFA", error);
                reject(error); // Reject the promise for unexpected errors
            }
        });
    };

    const fetchUserPromoCodes = async () => {
        try {
            const userId = user.uid
            const promoCodesRef = ref(database, `users/${userId}/promoCodes`);
            const snapshot = await get(promoCodesRef);

            if (snapshot.exists()) {
                const promoCodes = snapshot.val();
                // Ensure promo codes are returned as an array
                return Array.isArray(promoCodes) ? promoCodes : Object.values(promoCodes);
            } else {
                console.log("No promo codes available for this user.");
                return [];
            }
        } catch (error) {
            console.error("Error fetching promo codes:", error);
            throw new Error("Failed to fetch promo codes. Please try again.");
        }
    };


    const fetchTemplateStatus = async (userUid) => {
        try {
          // Check if userUid is provided
          if (!userUid) throw new Error("User not authenticated");
      
          // Get Firebase Realtime Database reference
         
          const userRef = ref(database, `users/${userUid}/ocrTemplate`);
      
          // Fetch data from the database
          const snapshot = await get(userRef);
      
          // Check if data exists
          if (snapshot.exists()) {
            const status = snapshot.val();
            console.log("Template Status:", status);
            return status; // Return the fetched status
          } else {
            console.log("No template status found");
            return null; // Return null if no status is found
          }
        } catch (error) {
          console.error("Error fetching template status:", error);
          return null; // Return null in case of an error
        }
      };
    return {

        checkMfaActive,
        fetchUserPromoCodes,
        fetchTemplateStatus
    };
};
