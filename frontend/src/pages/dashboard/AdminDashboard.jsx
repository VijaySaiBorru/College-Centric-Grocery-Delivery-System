import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

const navItems=[
    {path:'/dashboard/adminprofile',label:'Profile'},
    {path:'/dashboard/admin',label:'Dashboard'},
    { path: '/dashboard/add-new-product', label: 'Add Product' },
    { path: '/dashboard/manage-products', label: 'Manage Products' },
    // { path: '/dashboard/users', label: 'Users' },
    { path: '/dashboard/manage-orders', label: 'Manage-orders' },
]

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout=async()=>{
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
            
        } catch (error) {
            console.error("Failed to Log out",error)
        }
    }
  return (
    <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
    <div>
        <div className='nav__logo'>
        <Link to="/dashboard/adminprofile">Grocery Store<span>.</span></Link>
        <p className='text-xs italic'>Seller dashboard</p>
        </div>
        <hr className='mt-5' />
        <ul className='space-y-5 pt-5'>
            {
                navItems.map((item)=>(
                    <li key={item.path}>
                        <NavLink to={item.path}
                        className={({isActive})=>isActive?"text-blue-600 font-bold":'text-black'}
                        end >
                            {item.label}</NavLink>
                    </li>
                ))
            }

        </ul>
    </div>
    <div className='mb-3'>
        <hr className='mb-3'/>
        <button className='text-white bg-primary font-medium px-5 py-1 rounded-sm'
        onClick={handleLogout}
        >Logout</button>
    </div>
</div>

  )
}

export default AdminDashboard