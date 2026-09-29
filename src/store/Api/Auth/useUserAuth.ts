import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../../utils/axiosConfig';

export const useUserAuthApi = createApi({
    reducerPath: 'useUserAuthApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['useUserAuth'],
    endpoints: builder => ({
        // Login
        addLogin: builder.mutation({
            query: formData => ({
                url: '/auth/login',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        // SignUp
        addSignUp: builder.mutation({
            query: formData => ({
                url: '/auth/register',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        // verify otp
        addVerifyAccount: builder.mutation({
            query: formData => ({
                url: '/user/auth/verify-otp',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        // Resend otp
        addResendOtp: builder.mutation({
            query: formData => ({
                url: '/auth/resend-otp',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        updatePassword: builder.mutation({
            query: formData => ({
                url: '/user/change-password',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        updatePhone: builder.mutation({
            query: formData => ({
                url: '/user/request-change-mobile',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        otpPhone: builder.mutation({
            query: formData => ({
                url: '/user/verify-change-mobile',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        updateEmail: builder.mutation({
            query: formData => ({
                url: '/user/request-email-otp',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        updateInfo: builder.mutation({
            query: data => ({
                url: '/user/profile',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        otpEmail: builder.mutation({
            query: formData => ({
                url: '/user/verify-email-otp',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        userData: builder.query({
            query: () => ({
                url: '/user/me',
                method: 'Get',
            }),
            providesTags: ['useUserAuth'],
            keepUnusedDataFor: 0,
        }),

        resetPassword: builder.mutation({
            query: data => ({
                url: `/auth/reset-password`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        otpPassword: builder.mutation({
            query: ({ email_or_phone }) => ({
                url: `/auth/forgot-password?email_or_phone=${email_or_phone}`,
                method: 'POST',
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        // Add new AddressHomePage
        addAddressHomePage: builder.mutation({
            query: data => ({
                url: '/addresses',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        // Update AddressHomePage
        updateAddressHomePage: builder.mutation({
            query: ({ id, data }) => ({
                url: `/addresses/${id}`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['useUserAuth'],
        }),
        // setDefault
        setDefaultAddressHomePage: builder.mutation({
            query: addressId => ({
                url: `/addresses/${addressId}/set-default`,
                method: 'POST',
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        // Delete AddressHomePage
        deleteAddressHomePage: builder.mutation({
            query: id => ({
                url: `/addresses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['useUserAuth'],
        }),

        getAllAddressHomePage: builder.query({
            query: () => ({
                url: '/addresses',
                method: 'GET',
            }),
            providesTags: ['useUserAuth'],
        }),

        // Get one AddressHomePage by ID
        getAddressHomePageById: builder.query({
            query: id => ({
                url: `/addresses/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'useUserAuth', id }],
        }),
    }),
});

export const {
    useAddLoginMutation,
    useAddSignUpMutation,
    useAddVerifyAccountMutation,
    useAddResendOtpMutation,
    useUpdatePasswordMutation,
    useUpdateInfoMutation,
    useUserDataQuery,
    useUpdatePhoneMutation,
    useOtpPhoneMutation,
    useOtpPasswordMutation,
    useUpdateEmailMutation,
    useOtpEmailMutation,
    useResetPasswordMutation,
    useAddAddressHomePageMutation,
    useSetDefaultAddressHomePageMutation,
    useUpdateAddressHomePageMutation,
    useDeleteAddressHomePageMutation,
    useGetAllAddressHomePageQuery,
    useGetAddressHomePageByIdQuery,
} = useUserAuthApi;
