
import DashboardLayout from '../../components/layout/dashboard-layout/DashboardLayout'

const Home = () => {
  return (
   <DashboardLayout>
   <div className='min-h-screen'>
   <div className="flex-grow p-4">
      <div className="maindashboard flex flex-col md:flex-row items-baseline gap-3">
        <div className="mainsection ml-[20px] flex-1 h-screen">
          <h1 className="text-3xl font-bold text-white">May 29, 2024</h1>
          <h3 className="border mt-[20px] text-white py-3 px-[10px] text-lg md:text-[20px]">No Audio & Video Files Yet</h3>
        </div>
        <div className="sidesection w-full md:w-[400px] mt-4 md:mt-0">
          <div className="mainsection ml-[20px] flex-1 h-screen hidden md:block">
            <h1 className="text-xl font-bold ml-[-20px] text-white">Summary</h1>
            <h3 className="border mt-[20px] text-white py-3 pl-[10px] text-lg md:text-[20px] text-[12px] mr-[20px] ml-[-20px]">
              There is no summary
            </h3>
          </div>
        </div>
      </div>
    </div>

   </div>
   </DashboardLayout>
  )
}

export default Home