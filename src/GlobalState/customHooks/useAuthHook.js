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


    return {

        checkMfaActive
    };
};
