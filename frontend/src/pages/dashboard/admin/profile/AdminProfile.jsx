import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import avatarImg from '../../../../assets/avatar.png'
import { setSeller } from '../../../../redux/features/sellerauth/sellerauthSlice';
import { useEditSellerProfileMutation } from '../../../../redux/features/sellerauth/sellerauthApi';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { seller } = useSelector((state) => state.sellerauth.seller);
    console.log(seller);
    const [editProfile, { isLoading, isError, error, isSuccess }] = useEditSellerProfileMutation();
 const navigate = useNavigate();
    const [formData, setformData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        userId: '',
        address:'',
        timings:"",
        contact:"",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(seller) {
           setformData({
            username: seller?.username || '',
            profileImage: seller?.profileImage || '',
            bio: seller?.bio || '',
            userId: seller?._id || '',
            address: seller?.address || '',
            timings: seller?.timings || "",
            contact: seller?.contact || "",
           })
        }
    }, [seller])

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const updatedUser = {
            username: formData.username,
            profileImage: formData.profileImage,
            bio: formData.bio,
            userId: formData.userId,
            address: formData.address,
            timings: formData.timings,
            contact: formData.contact,
        }
        try {
            const response = await editProfile(updatedUser).unwrap();
            //console.log(response)
            dispatch(setSeller(response.seller));
           // console.log(seller);
            localStorage.setItem('seller', JSON.stringify(response.seller))
            alert('Profile updated successfully!');
            navigate('/dashboard/adminprofile')
            
        } catch (error) {
          console.error("Failed to update profile", error)  ;
          alert("Failed to update profile. Please try again")
        }

        setIsModalOpen(false)
    }

    return (
        <div className='container mx-auto p-6'>
            <div className='bg-white shadow-md rounded-lg p-6'>
                <div className='flex items-center mb-4'>
                    <img src={seller?.profileImage || avatarImg} alt="" className='w-32 h-32 object-cover rounded-full' />
                    <div className='ml-6'>
                        <h3 className='text-2xl font-semibold'>Grocery Shop Name: {seller?.username || 'N/A'}</h3>
                        <p className='text-gray-700'>Shop Bio: {seller?.bio || 'N/A'}</p>
                        <p className='text-gray-700'>Shop Address: {seller?.address || 'N/A'}</p>
                        <p className='text-gray-700'>Timings of Seller: {seller?.timings || 'N/A'}</p>
                        <p className='text-gray-700'>Contact Number: {seller?.contact || 'N/A'}</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='ml-auto text-blue-500 hover:text-blue-700'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h7m2 0h7a1 1 0 001-1V4a1 1 0 00-1-1h-7m-2 0v14"></path>
                        </svg>
                    </button>

                </div>
            </div>

            {/* show modal */}
            {
                isModalOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'>
                        <div className='bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'><i className="ri-close-line size-8 p-2 bg-gray-400 rounded-full"></i></button>
                            <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>
                            <form onSubmit={handleSubmit}> 
                                <div className='mb-4'>
                                    <label htmlFor="username" className='block text-sm font-medium text-gray-700 '>Storename</label>
                                    <input type="text" name='username' value={formData?.username}
                                        onChange={handleChange}
                                        placeholder='username'
                                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700 '>Store Image Url</label>
                                    <input type="text" name='profileImage' value={formData?.profileImage}
                                        onChange={handleChange}
                                        placeholder='profileImage url'
                                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm' required />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="bio" className='block text-sm font-medium text-gray-700 '>Write sho Bio</label>
                                    <textarea name="bio"
                                        rows= "2"
                                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        value={formData?.bio}
                                        onChange={handleChange}
                                        placeholder='add your bio'
                                    ></textarea>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="address" className='block text-sm font-medium text-gray-700 '>Address of the Shop</label>
                                    <textarea name="address"
                                        rows= "2"
                                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        value={formData?.address}
                                        onChange={handleChange}
                                        placeholder='add your shop address'
                                    ></textarea>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="contact" className='block text-sm font-medium text-gray-700 '>Contact :</label>
                                    <input type="text" name='contact' value={formData?.contact}
                                        onChange={handleChange}
                                        placeholder='+91 1234567890'
                                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="timings" className='block text-sm font-medium text-gray-700 '>Shop Timings :</label>
                                    <input type="text" name='timings' value={formData?.timings}
                                        onChange={handleChange}
                                        placeholder='06:00 AM to 10:00 PM'
                                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        required
                                    />
                                </div>
                                <button className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    type='submit'
                                    disabled={isLoading}
                                >{isLoading ? 'Saving...' : 'Save Changes'}</button>
                                {isError && <p className='mt-2 text-red-500'>Failed to update profile. Please try again</p>}
                                {isSuccess && <p className='mt-2 text-green-500'>Profile updated successfully!</p>}
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AdminProfile