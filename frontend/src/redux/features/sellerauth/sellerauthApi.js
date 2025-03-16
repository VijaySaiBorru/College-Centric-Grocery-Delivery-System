import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseURL"

const sellerauthApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/auth/seller`,
        credentials:'include',
    }),
    tagTypes:["Seller"],
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(newUser)=>({
                url:"/register",
                method:"POST",
                body:newUser
            })
        }),
        loginUser:builder.mutation({
            query:(credentials)=>({
                url:"/login",
                method:"POST",
                body:credentials
            })
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"/logout",
                method:"POST",
            })
        }),
        getUser:builder.query({
            query:()=>({
                url:"/sellers",
                method:"GET",
            }),
            refetchOnMount:true,
            invalidatesTags:["Sellers"],
        }),
        deleteUser:builder.mutation({
            query:(userId)=>({
                url:`/sellers/${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["Sellers"],
        }),
        editProfile:builder.mutation({
            query:(profileData)=>({
                url:`/edit-profile`,
                method:"PATCH",
                body:profileData
            })
        }),
    })
})
export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation,useDeleteUserMutation,useEditProfileMutation,useGetUserQuery}=sellerauthApi;
export default sellerauthApi;