import ProductCards from "./ProductCards";
import { useState } from 'react';
import { useFetchTrendingProductsQuery } from '../../redux/features/products/productsApi';  // Assuming you have this query in your productsApi

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);  // Initially 8 products
    const [showLoadMore, setShowLoadMore] = useState(true);  // Controls if the Load More button should be shown
    const [showClose, setShowClose] = useState(false);  // Controls if the Close button should be shown
    const { data, isLoading, error } = useFetchTrendingProductsQuery({
        page: 1,
        limit: visibleProducts  // Limit the products shown based on the visibleProducts state
    });

    // Check if there are more products to load
    const hasMoreProducts = data?.totalProducts > visibleProducts;

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);  // Increase the number of visible products by 4
        setShowLoadMore(false);  // Hide Load More button after it's clicked
        setShowClose(true);  // Show Close button after Load More
    };

    const closeLoadMoreButton = () => {
        setVisibleProducts(8);  // Reset visible products back to the original number (8)
        setShowLoadMore(true);  // Re-show Load More button
        setShowClose(false);  // Hide Close button
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading products</p>;
    }

    return (
        <section className="section__container product__container">
            <h2 className="section__header">Trending Products</h2>
            <p className='section__subheader mb-12'>
            "Discover the Freshest Picks: Elevate Your Lifestyle with Our Curated Collection of Daily Groceries & Essentials!"
            </p>
            <div className="mt-12">
                <ProductCards products={data?.products} />
            </div>
            {hasMoreProducts && showLoadMore && (
                <div className="product__btn">
                    <button className="btn" onClick={loadMoreProducts}>Load More</button>
                </div>
            )}
            {showClose && (
                <div className="product__btn">
                    <button className="btn" onClick={closeLoadMoreButton}>Close</button>
                </div>
            )}
        </section>
    );
};

export default TrendingProducts;
