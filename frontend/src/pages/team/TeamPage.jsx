// src/pages/team/TeamPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchTeamProductsQuery } from '../../redux/features/products/productsApi'; // Correct path
import ProductCards from "../shop/ProductCards";

const TeamPage = () => {
  const { teamName } = useParams(); // Get the team name from the URL parameters
  
  // Using the RTK Query hook to fetch products based on team
  const { data, isLoading, error } = useFetchTeamProductsQuery({
    teamName, // Pass the team name to fetch products associated with that team
    page: 1, // You can implement pagination if needed
    limit: 8, // Adjust the number of products per page
  });

  // Scroll to top when the component mounts or team changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [teamName]);

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{teamName}</h2>
        <p className='section__subheader'>
          Explore exclusive products related to {teamName}!
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

export default TeamPage;
