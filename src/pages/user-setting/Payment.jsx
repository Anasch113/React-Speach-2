
import UserDashboard from '../../components/layout/user-dashboard/UserDashboard';

const PaymentBillingInfo = () => {
    const handleChangePlan = () => {
        // Handle change plan logic here
        console.log('Change Plan clicked');
    };

    return (
        <UserDashboard>
            <div className="flex-grow p-4">
                <div className="p-4">
                    <h2 className="text-3xl font-bold mb-4 text-white">Payment &amp; Billing Info</h2>
                    <div className="mb-4 flex flex-col sm:flex-row gap-1">
                        <label className="block mb-2 text-xl text-white">Plan Type :</label>
                        <p className="text-orange-400 text-xl ">Premium</p>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row gap-1">
                        <label className="block mb-2 text-xl text-white">Start Date :</label>
                        <p className="text-xl text-white">2023-01-01</p>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row gap-1">
                        <label className="block mb-2 text-xl text-white">End Date :</label>
                        <p className="text-xl text-white">2024-01-01</p>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row gap-1">
                        <label className="block mb-2 text-xl text-white">Plan Duration :</label>
                        <p className="text-xl text-white">1 year</p>
                    </div>
                    <button
                        className="px-5 py-3 bg-purple-700 text-white rounded text-base"
                        onClick={handleChangePlan}
                    >
                        Change Plan
                    </button>
                </div>
            </div>

        </UserDashboard>
    );
};

export default PaymentBillingInfo;
