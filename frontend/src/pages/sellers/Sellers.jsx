import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSellerQuery } from '../../redux/features/sellerauth/sellerauthApi'; // Correct path

const Sellers = () => {
  const navigate = useNavigate();
  // Fetch sellers data using RTK query
  const { data, isLoading, error } = useGetSellerQuery();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage] = useState(4); // Number of sellers per page

  // Calculate total pages based on the number of sellers
  const totalPages = data ? Math.ceil(data.length / sellersPerPage) : 1;

  // Slice data based on the current page
  const currentSellers = data ? data.slice((currentPage - 1) * sellersPerPage, currentPage * sellersPerPage) : [];

  // Scroll to top on page load or change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle seller click to navigate to the seller's page
  const handle = (sellerId, username) => {
    navigate(`/seller/${sellerId}/${username}`);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentSellers.map((seller) => (
                <div key={seller._id} onClick={() => handle(seller._id, seller.username)} className="cursor-pointer">
                  <a
                    href={seller.link}
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // For security purposes when opening in a new tab
                    className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={seller.profileImage}
                      alt="seller image"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="blog__card__content mt-4">
                      <h6 className="text-xl font-semibold">{seller.username}</h6>
                      <h4 className="text-2xl font-bold mt-2">{seller.bio}</h4>
                      <p className="text-sm text-gray-500 mt-2">{seller.timings}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>

              {/* Pagination buttons */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-700'} rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sellers;
