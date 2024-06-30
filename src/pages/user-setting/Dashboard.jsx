import { useState } from 'react';
import UserDashboard from '../../components/layout/user-dashboard/UserDashboard';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        // Add your save logic here
        console.log('Name:', name);
        console.log('Email:', email);
    };

    return (
        <UserDashboard>
            <div className="flex-grow p-4">
                <div className="p-4">
                    <h2 className="font-bold mb-4 text-3xl text-white">User Profile</h2>
                    <div className="mb-4">
                        <label className="block mb-2 md:text-base text-white">Name</label>
                        <input
                            type="text"
                            className="w-full md:w-[500px] p-2 border border-gray-300 rounded focus:outline-none"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 md:text-base text-white">Email</label>
                        <input
                            type="email"
                            className="w-full md:w-[500px] p-2 border border-gray-300 rounded focus:outline-none"
                            placeholder="Johndoe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full md:w-[100px] px-4 py-2 bg-purple-700 text-white rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>

        </UserDashboard>
    );
};

export default Dashboard;
