import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseURL"

const productsApi = createApi({
    reducerPath:'produtsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/products`,
        credentials:'include',
    }),
    tagTypes:["Products"],
    endpoints:(builder)=>({
        fetchAllProducts:builder.query({
            query:({category,color,minPrice,maxPrice,page=1,limit=10})=>{
                const queryParams = new URLSearchParams({
                    category:category|| '',
                    color:color||'',
                    minPrice:minPrice||0,
                    maxPrice:maxPrice||0,
                    page:page.toString(),
                    limit:limit.toString()
                }).toString();
                return `/?${queryParams}`
            },
            providesTags:["Products"]
        }),
        fetchSearchProducts: builder.query({
            query: ({ search = '', page = 1, limit = 10 }) => {
                const body = {
                    search,  // Search term for filtering by name or description
                    page: page.toString(),  // Page number for pagination
                    limit: limit.toString()  // Limit number of products per page
                };
        
                return {
                    url: '/search',  // Endpoint for searching
                    method: 'POST',  // Use POST method
                    body: body  // Pass the body with search, page, and limit data
                };
            },
            providesTags: ["Products"]
        }),  
        fetchTrendingProducts: builder.query({
            query: ({ page = 1, limit = 8 }) => {
              const queryParams = new URLSearchParams({
                page: page.toString(), 
                limit: limit.toString()
              }).toString();
          
              return {
                url: `/trending?${queryParams}`,  // Endpoint for trending products
                method: 'GET'  // GET method is correct here
              };
            },
            providesTags: ["Products"]
          }),
          
         
        fetchCategoryProducts: builder.query({
            query: ({ teamName, page = 1, limit = 8 }) => {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
        
                return {
                    url: `/categories/${teamName}?${queryParams}`,  // Endpoint for category products
                    method: 'GET',  // Use GET method
                };
            },
            providesTags: ["Products"],
        }),
        fetchSellerProducts: builder.query({
            query: ({ sellerId, page = 1, limit = 8 }) => {
                console.log(sellerId)
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    sellerId:sellerId,
                }).toString();
                
                return {
                    url: `/seller/${sellerId}?${queryParams}`,  // Endpoint for team products
                    method: 'GET',  // Use GET method
                };
            },
            providesTags: ["Products"],
        }),
        
                    
        fetchProductById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:"Products"},id]
        }),
        AddProduct:builder.mutation({
            query:(newProduct)=>({
                url:"/create-product",
                method:"POST",
                body:newProduct,
                credentials:"include",
            }),
            invalidatesTags:["Products"],
        }),
        fetchRelatedProducts:builder.query({
            query:(id)=>`/related/${id}`,
        }),
        updateProduct:builder.mutation({
            query:({id,...rest})=>({
                url:`/update-product/${id}`,
                method:"PATCH",
                body:rest,
                credentials:"include",
            }),
            invalidatesTags:["Products"]
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:(result,error,id)=> [{type: "Products",id}],
        }),

    })
});

export const {useFetchSellerProductsQuery,useFetchAllProductsQuery,useFetchProductByIdQuery,useAddProductMutation,useFetchRelatedProductsQuery,useUpdateProductMutation,useDeleteProductMutation,useFetchSearchProductsQuery,useFetchTrendingProductsQuery,useFetchCategoryProductsQuery}=productsApi;

export default productsApi;