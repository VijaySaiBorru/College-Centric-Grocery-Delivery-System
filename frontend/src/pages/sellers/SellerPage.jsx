import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSellerProductsQuery } from '../../redux/features/products/productsApi'; // Correct path
import ProductCards from "../shop/ProductCards";

const SellerPage = () => {
  const { sellerId, username } = useParams(); // Get the seller ID and username from URL parameters
  console.log(sellerId, username);

  // Initialize state for products and pagination
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // Fetch all products using RTK Query
  const { data, isLoading, error } = useFetchSellerProductsQuery({
    sellerId, // Pass the sellerId to fetch products associated with that seller
    page: 1,  // We are fetching all products once
    limit: 99999, // A large number to fetch all products in one request
  });

  useEffect(() => {
    // Scroll to top when the component mounts or the seller changes
    window.scrollTo(0, 0);

    // Update products when data is available
    if (data) {
      setProducts(data.products); // Save all products
    }
  }, [data, sellerId]); // Re-run effect if data or sellerId changes

  // Calculate total pages based on the number of products
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(startProduct + productsPerPage - 1, products.length);

  // Get the products for the current page
  const currentPageProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{username}</h2>
        <p className='section__subheader'>
          Explore exclusive products related to {username}
        </p>
      </section>

      <h3 className='text-xl font-medium mb-4'>
        Showing {startProduct} to {endProduct} of {products.length} products
      </h3>

      <div className='section__container container'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching products</p>
        ) : (
          <ProductCards products={currentPageProducts} />
        )}
      </div>

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
  );
};

export default SellerPage;
