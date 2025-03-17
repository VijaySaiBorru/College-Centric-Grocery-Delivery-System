import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const sellerauthApi = createApi({
    reducerPath: "sellerauthApi", // FIXED: Unique reducer path
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth/seller`,
        credentials: "include",
    }),
    tagTypes: ["Seller"], // FIXED: Keep consistent casing
    endpoints: (builder) => ({
        registerSeller: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
        }),
        loginSeller: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logoutSeller: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        getSeller: builder.query({
            query: () => ({
                url: "/sellers",
                method: "GET",
            }),
            providesTags: ["Seller"], // FIXED: Use `providesTags`
        }),
        deleteSeller: builder.mutation({
            query: (userId) => ({
                url: `/sellers/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Seller"], // FIXED: Match `tagTypes`
        }),
        editSellerProfile: builder.mutation({
            query: (profileData) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body: profileData,
            }),
            invalidatesTags: ["Seller"], // FIXED: Match `tagTypes`
        }),
    }),
});

export const {
    useRegisterSellerMutation,
    useLoginSellerMutation,
    useLogoutSellerMutation,
    useDeleteSellerMutation,
    useEditSellerProfileMutation,
    useGetSellerQuery,
} = sellerauthApi;

export default sellerauthApi;
