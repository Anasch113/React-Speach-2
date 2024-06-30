import { useState } from 'react';
import UserDashboard from '../../components/layout/user-dashboard/UserDashboard';

const SecuritySettings = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = () => {
        // Handle password change logic here
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
    };

    const handleForgetPassword = () => {
        // Handle forget password logic here
        console.log('Forget Password clicked');
    };

    return (
        <UserDashboard>
            <div className="flex-grow p-4">
                <div className="p-4">
                    <h2 className="text-3xl font-bold mb-4 text-white">Security Settings</h2>
                    <div className="mb-4">
                        <label className="block mb-2 md:text-base text-white">Old Password</label>
                        <input
                            type="password"
                            className="w-full md:w-[500px] p-2 border border-gray-300 rounded focus:outline-none"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 md:text-base text-white">New Password</label>
                        <input
                            type="password"
                            className="w-full md:w-[500px] p-2 border border-gray-300 rounded focus:outline-none"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <button
                            className="px-4 py-2 mb-2 md:mb-0 md:mr-4 text-white bg-blue-500 rounded"
                            onClick={handleForgetPassword}
                        >
                            Forget Password?
                        </button>
                        <button
                            className="px-4 py-2 bg-purple-700 text-white rounded"
                            onClick={handlePasswordChange}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

        </UserDashboard>
    );
};

export default SecuritySettings;
