import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseURL"

export const statsApi = createApi({
    reducerPath:'statsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/stats`,
        credentials:'include',
    }),
    tagTypes:["Stats"],
    endpoints:(builder)=>({
       getUserStats:builder.query({
        query:(email)=>`/user-stats/${email}`,
        providesTags:["Staats"],
        }),
        getAdminStats:builder.query({
            query:(sellerId)=>`/admin-stats/${sellerId}`,
            providesTags:["Staats"],
        }),
    })
});

export const {useGetAdminStatsQuery,useGetUserStatsQuery}=statsApi;

export default statsApi;