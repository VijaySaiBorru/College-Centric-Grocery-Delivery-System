import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useLoginSellerMutation } from '../redux/features/sellerauth/sellerauthApi';
import { setUser } from '../redux/features/auth/authSlice';
import { setSeller } from '../redux/features/sellerauth/sellerauthSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');  // ✅ Corrected state

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loginUser, { isLoading: userLoading }] = useLoginUserMutation();
    const [loginSeller, { isLoading: sellerLoading }] = useLoginSellerMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };
        try {
            if (role === "seller") {  // ✅ Check role correctly
                const response = await loginSeller(data).unwrap();
                const { seller } = response;
                dispatch(setSeller({ seller }));
                alert('Seller Login Successful');
                navigate('/dashboard/adminprofile');
            } else if (role === "student") {
                const response = await loginUser(data).unwrap();
                const { user } = response;
                dispatch(setUser({ user }));
                alert('User Login Successful');
                navigate('/');
            } else {
                setMessage('Please select a valid role');
            }
        } catch (error) {
            setMessage('Please provide a valid email and password');
        }
    };

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>        
                <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
                <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
                    
                    
                    <div className='flex items-center'>
                        <label htmlFor='role' className='text-sm mr-2'>Select Role:</label>
                        <select 
                            id='role'  
                            value={role}  
                            onChange={(e) => setRole(e.target.value)} 
                            className='border p-2 rounded-md'
                        >
                            <option value="">Select</option>
                            <option value="student">Student</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    <input type='email' name='email' id='email' 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address' required 
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    <input type='password' name='password' id='password' 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' required 
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    {
                        message && <p className='text-red-500'>{message}</p>
                    }
                    <button type='submit'
                        className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                        disabled={userLoading || sellerLoading}>
                        {userLoading || sellerLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className='my-5 italic text-sm text-center'>
                    Don't have an account? <Link to='/register' className='text-red-700 px-1 underline hover:text-red-900'>Register</Link> here.
                </p>
            </div>
        </section>
    );
};

export default Login;
