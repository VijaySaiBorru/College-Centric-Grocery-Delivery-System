import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { useRegisterSellerMutation } from '../redux/features/sellerauth/sellerauthApi';
const Register = () => {
    const [username,setUserName]=useState('');
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
        const [role, setRole] = useState('');
    const [registerUser,{isLoading}]=useRegisterUserMutation();
    const [registerSeller,{isLoadingSeller}]=useRegisterSellerMutation();
    const navigate= useNavigate();
      const handleRegister = async (e) => {
            e.preventDefault();
            const data = { email, password,username };
            try {
                if (role === "seller") {
                    await registerSeller(data).unwrap();
                   alert("Registration successful! Please Login.");
                   navigate("/login");  
                    
                } else if (role === "student") {
                   await registerUser(data).unwrap();
                   alert("Registration successful! Please Login.");
                   navigate("/login");
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
            <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
            <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
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
                <input type="text" name='username' id='username' 
                onChange={(e)=>setUserName(e.target.value)}
                placeholder='Username' required 
                className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                <input type="email" name='email' id='email' 
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email Address' required 
                className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                <input type="password" name='password' id='password' 
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password' required 
                className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                {
                    message && <p className='text-red-500'>{message}</p>
                }
                <button type='submit'
                className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                >Register</button>
            </form>
            <p className='my-5 italic text-sm text-center'>
                Already have an account? Please<Link to="/login" className="text-red-700 px-1 underline hover:text-red-900">Login</Link></p>
        </div>
    </section>
  )
}

export default Register