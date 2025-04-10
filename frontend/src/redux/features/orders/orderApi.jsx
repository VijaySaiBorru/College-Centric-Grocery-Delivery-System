import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseURL"

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/orders`,
        credentials:'include',
    }),
    tagTypes:["Order"],
    endpoints:(builder)=>({
       getOrdersByEmail:builder.query({
        query:(email)=>({
            url:`/${email}`,
            method:'GET'
        }),
        providesTags:['Order']
        }),
        getOrdersById:builder.query({
            query:(orderId)=>({
                url:`/order/${orderId}`,
                method:'GET'
            }),
            providesTags:['Order']
        }),
        getOrdersBysellerId:builder.query({
            query:(sellerId)=>({
                url:`/seller/${sellerId}`,
                method:'GET'
            }),
            providesTags:['Order']
        }),
        getAllOrders: builder.query({
            query: () => (
                {
                    url: '',
                    method: 'GET',  
                }
            ),
            providesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/update-order-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        })
    })
});

export const {useDeleteOrderMutation,useGetAllOrdersQuery,useGetOrdersByEmailQuery,useGetOrdersByIdQuery,useUpdateOrderStatusMutation,useGetOrdersBysellerIdQuery}=orderApi;

export default orderApi;