import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthHook } from '@/GlobalState/customHooks/useAuthHook';
import { useUserAuth } from '../../context/UserAuthContext'
const PaymentAdditionalInfo = ({
    promoCode,
    handlePromodeCodeChange,
    onCurrencyChange
}) => {

    const [promoCodes, setPromoCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const { fetchUserPromoCodes } = useAuthHook()
    const { userBalance, user } = useUserAuth();
    const userId = user.uid
    const userEmail = user.email


    useEffect(() => {
        const getPromoCodes = async () => {
            try {
                setLoading(true);
                const codes = await fetchUserPromoCodes(userId);
                setPromoCodes(codes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            getPromoCodes();
        }
    }, [userId]);


    const [currency, setCurrency] = useState('USD'); // Default currency

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        setCurrency(selectedCurrency);
        onCurrencyChange(selectedCurrency); // Notify parent of the change
    };

    return (
        <div className='flex flex-col justify-between items-start gap-1 border border-white'>

            <span className=' flex flex-col gap-3'>
                <label className=' text-center font-medium  font-poppins'>Promo Code </label>
                <input type='text' value={promoCode}
                    onChange={handlePromodeCodeChange} className='bg-bg-gray-new  font-medium  font-poppins p-2 rounded-sm'></input>
            </span>

            <span className='my-4 p-2 space-x-2'>
                <label htmlFor="currencySelector">Choose Currency: </label>
                <select className='bg-bg-navy-blue outline-none p-2 rounded-md' id="currencySelector" value={currency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="AUD">AUD</option>
                </select>
            </span>

            <span className="border my-2 p-4 ">

                {promoCodes.length > 0 ? (
                    <span>
                        Available Promo codes:
                        {
                            promoCodes.map((code, index) => (
                                <div key={index} className="promo-code">

                                    <p>{code}</p>
                                </div>
                            ))
                        }

                    </span>
                ) : (
                    <p>No promo codes available.</p>
                )}
            </span>
        </div>
    )
}

export default PaymentAdditionalInfo
