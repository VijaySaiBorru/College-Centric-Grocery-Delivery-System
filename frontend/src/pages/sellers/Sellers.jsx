// src/pages/team/TeamPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSellerQuery } from '../../redux/features/sellerauth/sellerauthApi'; // Correct path
import ProductCards from "../shop/ProductCards";

const Sellers = () => {
  const navigate=useNavigate();
  // Using the RTK Query hook to fetch products based on team
  const { data, isLoading, error } = useGetSellerQuery();
  console.log(data)
  // Scroll to top when the component mounts or team changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handle =(sellerId)=>{
    navigate(`/seller/${sellerId}`);
  }

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Groceries Near You</h2>
        <p className='section__subheader'>
          Explore exclusive Sellers near to you and grab exciting rewards!
        </p>
      </section>
      
      <div className='section__container container'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching products</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {data.map((blog, index) => (
                    <div key={blog._id} onClick={() => handle(blog._id)} className="cursor-pointer">
                    <a
                      key={index}
                      href={blog.link}
                      target="_blank" // Opens the link in a new tab
                      rel="noopener noreferrer" // For security purposes when opening in a new tab
                      className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
                    >
                      <img
                        src={blog.profileImage}
                        alt="blog image"
                        className="w-full h-auto object-cover rounded-lg"
                        
                      />
                      <div className="blog__card__content mt-4">
                        <h6 className="text-xl font-semibold">{blog.username}</h6>
                        <h4 className="text-2xl font-bold mt-2">{blog.bio}</h4>
                        <p className="text-sm text-gray-500 mt-2">{blog.timings}</p>
                      </div>
                    </a>
                    </div>
                  ))}
                </div>
        )}
      </div>
    </>
  );
};

export default Sellers;