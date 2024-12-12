import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// baseURL=http://localhost:8000/api/v1
// baseURL=https://full-stack-ecommerce-api-pi.vercel.app/api/v1
// baseURL=https://full-stack-ecommerce-app-sq9o.onrender.com/api/v1

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        products: builder.query({
            query: ({ limit = 20, page = 1, brand = '', category = '', search = '' }) =>
                `/products?limit=${limit}&page=${page}&brand=${brand}&category=${category}&search=${search}`,
        }),
        brandList: builder.query({
            query: () => '/products/brands',
        }),
        categoryList: builder.query({
            query: () => '/products/categories',
        }),

        // Auth Queries
        me: builder.query({
            query: () => `/auth/me`,
        }),
        login: builder.mutation({
            query: (item) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: item,
            }),
        }),
        signIn: builder.mutation({
            query: (item) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: item,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ password, email, role, username }) => ({
                url: '/auth/update',
                method: 'PATCH',
                body: JSON.stringify({ password, email, role, username }),
            }),
        }),
        uploadAvatar: builder.mutation({
            query: (formData) => ({
                url: '/auth/avatar',
                method: 'PATCH',
                body: JSON.stringify(formData),
            }),
        }),
        uploadCoverImg: builder.mutation({
            query: (path) => ({ url: '/auth/cover-image', method: 'PATCH', body: path }),
        }),
        removeCoverImg: builder.mutation({
            query: ({ url }) => ({
                url: '/auth/cover-image',
                method: 'DELETE',
                body: JSON.stringify({ url }),
            }),
        }),
        removeAvatar: builder.mutation({
            query: ({ url }) => ({
                url: '/auth/avatar',
                method: 'DELETE',
                body: JSON.stringify({ url }),
            }),
        }),

        // Order Queries
        order: builder.query({
            query: () => `/orders/all`,
        }),
        checkout: builder.mutation({
            query: (item) => ({
                url: '/orders/checkout-stripe',
                method: 'POST',
                body: item,
            }),
        }),

        // Wishlist Queries
        handleWishlist: builder.mutation({
            query: (productId) => ({
                url: `/auth/wishlist/${productId}`,
                method: 'POST',
            }),
        }),

        // Product Review Queries
        getReviews: builder.query({
            query: () => '/reviews',
        }),
        getReviewById: builder.query({
            query: (id) => `/reviews/review/${id}`,
        }),
        handleAddReview: builder.mutation({
            query: (item) => ({
                url: `/reviews`,
                method: 'POST',
                body: JSON.stringify(item),
            }),
        }),
        handleUpdateReview: builder.mutation({
            query: ({ reviewId, rating, comment }) => ({
                url: `/reviews/${reviewId}`,
                method: 'PUT',
                body: { rating, comment },
            }),
        }),
        handleDeleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useOrderQuery, useCheckoutMutation, useHandleWishlistMutation } = apiSlice;

// Reviews
export const {
    useGetReviewsQuery,
    useGetReviewByIdQuery,
    useHandleAddReviewMutation,
    useHandleUpdateReviewMutation,
    useHandleDeleteReviewMutation,
} = apiSlice;

// Products
export const {
    useBrandListQuery, // check
    useCategoryListQuery, // check
    useProductsQuery,
} = apiSlice;

// Auth
export const {
    useMeQuery,
    useLoginMutation,
    useSignInMutation,
    useUpdateUserMutation, // check
    useUploadAvatarMutation,
    useUploadCoverImgMutation, // check
    useRemoveAvatarMutation, // check
    useRemoveCoverImgMutation, // check
} = apiSlice;
