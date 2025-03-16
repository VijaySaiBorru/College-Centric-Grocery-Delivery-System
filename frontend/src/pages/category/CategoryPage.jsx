// src/pages/category/CategoryPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCategoryProductsQuery } from '../../redux/features/products/productsApi'; // Correct path
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();
  
  // Using the RTK Query hook to fetch products based on category
  const { data, isLoading, error } = useFetchCategoryProductsQuery({
    categoryName,
    page: 1, // You can implement pagination if needed
    limit: 8, // Adjust the number of products per page
  });

  // Scroll to top when the component mounts or category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>
          Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
        </p>
      </section>
      
      <div className='section__container container'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching products</p>
        ) : (
          <ProductCards products={data?.products || []} />
        )}
      </div>
    </>
  );
};

export default CategoryPage;
