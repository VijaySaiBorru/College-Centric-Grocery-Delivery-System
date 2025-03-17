import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {
    const {user}=useSelector((state)=>state.auth);
    const {seller}=useSelector((state)=>state.sellerauth);
    if(!user && !seller){
        return <Navigate to="/login" replace />
    }
    var role= user?"user" : "seller";
    console.log("", role)
    const renderDashboard=()=>{
        switch(role){
            case 'seller':
                return <AdminDashboard />;
            default:
                return <UserDashboard />;
            // default:
            //     return <Navigate to="/login" replace />
        }
    }
  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
        <header className='lg:w-1/3 sm:w-2/5 w-full border'>
        {renderDashboard()}
        </header>
        <main className='p-8 bg-white w-full border mt-5'>
             <Outlet />
        </main>
        
    </div>
  )
}

export default DashboardLayout