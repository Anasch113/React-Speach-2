import MainLayout from '@/components/SummriazationDepostion/MainLayout'
import Sidebar from '@/layout/Sidebar';
import React, { useEffect, useState } from 'react'

const SummriazationDeposition = () => {
    const [activeSection, setActiveSection] = useState('upload');
    const [checkSection, setCheckSection] = useState(false);

    useEffect(() => {
        setCheckSection(true)
    }, [])
    return (
        <div className='min-h-screen flex w-full p-4'>
            <div className=''>
                <Sidebar />
            </div>

            <MainLayout
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                checkSection={checkSection}
            />
        </div>
    )
}

export default SummriazationDeposition
