import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchSearchProductsQuery } from '../../redux/features/products/productsApi';
import ProductCards from '../shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); // Pagination page state
  const [limit, setLimit] = useState(10); // Pagination limit state

  // Using useFetchSearchProductsQuery to fetch products based on search query
  const { data: productsData, isLoading, error } = useFetchSearchProductsQuery({
    search: searchQuery,
    page: page,
    limit: limit,
  });

  // Handle key down event for 'Enter' key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setPage(1); // Reset to page 1 on each search
    }
  };

  // Update search query on input change
  const handleSearch = () => {
    setPage(1); // Reset to page 1 on each search
  };

  // Effect to handle changes in searchQuery, page, and limit
  useEffect(() => {
    // When searchQuery or pagination values change, trigger the search
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, page, limit]);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile accessories.
          Elevate your style today!
        </p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-bar w-full max-w-4xl p-2 border rounded"
            placeholder="Search for products..."
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>

        {/* Loading, error handling and displaying products */}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading products: {error.message}</p>}

        {/* Display products */}
        {productsData && productsData.products && (
          <ProductCards products={productsData.products} />
        )}
      </section>
    </>
  );
};

export default Search;
