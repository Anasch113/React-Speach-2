import MainLayout from '@/components/SummriazationDepostion/MainLayout'
import React, { useEffect, useState } from 'react'

const SummriazationDeposition = () => {
    const [activeSection, setActiveSection] = useState('upload');
    const [checkSection, setCheckSection] = useState(false);

    useEffect(() => {
        setCheckSection(true)
    }, [])
    return (
        <div className='min-h-screen w-full'>
            <MainLayout
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                checkSection={checkSection}
            />
        </div>
    )
}

export default SummriazationDeposition
