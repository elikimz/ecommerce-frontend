import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerAPI = createApi({
  reducerPath: "registerAPI",
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
  tagTypes: ["Users"], // ✅ Add tag type
  endpoints: (builder) => ({
    // ✅ Register user
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"], // ✅ Invalidate after registering
    }),

    // ✅ Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),

    // ✅ Get all users (admin only)
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"], // ✅ Provide tag
    }),

    // ✅ Update current profile
    updateUserProfile: builder.mutation({
      query: (updatedUser) => ({
        url: "update-profile",
        method: "PUT",
        body: updatedUser,
      }),
    }),

    // ✅ Update any user by ID (admin)
    updateUserById: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"], // ✅ Invalidate
    }),

    // ✅ Delete user by ID (admin)
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"], // ✅ Invalidate
    }),

    // ✅ Forgot password
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),

    // ✅ Reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Test protected route
    testProtected: builder.query({
      query: () => "protected",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useUpdateUserProfileMutation,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useTestProtectedQuery,
} = registerAPI;
