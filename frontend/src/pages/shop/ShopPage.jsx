import { useEffect, useState } from "react";
import productsData from "../../data/products.json"
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters={
    categories: ['all' , 'clothing', 'bakery', 'chips' , 'electronics','fruits','groceries','soft_drinks','stationary','vegetables','medicine'],
    colors: ['all','black','red','gold','blue','silver','beige'  ,'green'],
    priceRanges:[
        {label:'Under ₹50',min:0 , max:50},
        {label:'₹50 - ₹100',min:50 , max:100},
        {label:'₹100 - ₹200',min:100 , max:200},
        {label:'₹200 and above',min:200 , max:Infinity},
    ]
};

const ShopPage = () => {
    const [filterState, setFilterState]=useState({
        category:'all',
        color:'all',
        priceRange:''
    });
    const [currentPage,setCurrentPage]=useState(1);
    const [ProductsPerPage]=useState(8);
    const {category,color,priceRange} = filterState;
    const [minPrice,maxPrice]=priceRange?priceRange.split('-').map(Number):[0,Infinity];
    const {data:{products=[],totalPages,totalProducts}={},error,isLoading}=useFetchAllProductsQuery({
        category:category !== 'all' ? category : '',
        color:color !== 'all' ? color : '',
        minPrice:!isNaN(minPrice)?minPrice:'',
        maxPrice:!isNaN(maxPrice)?maxPrice:'',
        page:currentPage,
        limit:ProductsPerPage,
    });
    console.log(products)

    /* without using backend products
     const [products,setProducts]=useState(productsData);
    const applyFilters=()=>{
        let filteredProducts=productsData;
        if(filterState.category && filterState.category !=='all'){
            filteredProducts=filteredProducts.filter(product => product.category === filterState.category)
        }
        if(filterState.color && filterState.color !=='all'){
            filteredProducts=filteredProducts.filter(product => product.color === filterState.color)
        }
        if(filterState.priceRange){
            const[minPrice,maxPrice]=filterState.priceRange.split('-').map(Number);
            filteredProducts=filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)
        }
        setProducts(filteredProducts);
    }
    useEffect(()=>{
        applyFilters();
    },[filterState]);*/
    const clearFilters=()=>{
        setFilterState({
            category:'all',
            color:'all',
            priceRange:''
        })
    }
    const handlePageChange=(pageNumber)=>{
        if(pageNumber>0 && pageNumber <= totalPages){
            setCurrentPage(pageNumber);
        }
    }
    if(isLoading) return <div>Loading...</div>
    if (error) return (
        <div>
            <p>Error Loading Products</p>
            <button onClick={() => setCurrentPage(1)}>Retry</button>
        </div>
    );
    const startProduct = (currentPage-1) * ProductsPerPage +1;
    const endProduct =startProduct + products.length - 1;
  return (
    <>
        <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>Shop Page</h2>
            <p className='section__subheader'>Freshness Delivered: Shop the Best Groceries & Daily Essentials for College Life!
            </p>
        </section>
        <section className='section__container'>
            <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                <ShopFiltering filters={filters} filterState={filterState} setFilterState={setFilterState} clearFilters={clearFilters}/>
                <div>
                    <h3 className='text-xl font-medium mb-4'>
                        Showing {startProduct} to {endProduct} of {totalProducts} products
                    </h3>
                    <ProductCards products={products}/>
                    <div className="mt-6 flex justify-center">
                        <button disabled={currentPage==1}
                         onClick={()=>handlePageChange(currentPage-1)}
                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2">Previous</button>
                        {
                            [...Array(totalPages)].map((_,index)=>(
                                <button onClick={()=>handlePageChange(index+1)}
                                 key={index} className={`px-4 py-2 ${currentPage === index+1 ? 'bg-blue-500 text-white' :'text-gray-700'}
                                rounded-md mx-1`}>{index+1}</button>

                            ))
                        }
                        <button disabled={currentPage==totalPages}
                         onClick={()=>handlePageChange(currentPage+1)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2">Next</button>
                    </div>
                </div>
            </div>
            
        </section>
    </>
  )
}

export default ShopPage