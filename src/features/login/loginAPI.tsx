
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const loginAPI = createApi({
//   reducerPath: "loginAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://ecommerce-backend-yeq9.onrender.com/",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (newUser) => ({
//         url: "register",
//         method: "POST",
//         body: newUser,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: "login",
//         method: "POST",
//         body: new URLSearchParams(credentials),
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }),
//     }),
//     getUsers: builder.query({
//       query: () => "users",
//     }),
//     updateUserProfile: builder.mutation({
//       query: (updatedUser) => ({
//         url: "update-profile",
//         method: "PUT",
//         body: updatedUser,
//       }),
//     }),
//     forgotPassword: builder.mutation({
//       query: (emailData) => ({
//         url: "forgot-password",
//         method: "POST",
//         body: emailData,
//       }),
//     }),
//     resetPassword: builder.mutation({
//       query: (data) => ({
//         url: "reset-password",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     testProtected: builder.query({
//       query: () => "protected",
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useGetUsersQuery,
//   useUpdateUserProfileMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
//   useTestProtectedQuery,
// } = loginAPI;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-backend-yeq9.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: new URLSearchParams(credentials),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
    getCurrentUserProfile: builder.query({
      query: () => "me",
    }),
    updateUserProfile: builder.mutation({
      query: (updatedUser) => ({
        url: "update-profile",
        method: "PUT",
        body: updatedUser,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),
    testProtected: builder.query({
      query: () => "protected",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useTestProtectedQuery,
} = loginAPI;
