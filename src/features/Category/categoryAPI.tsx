import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
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
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "categories?skip=0&limit=100",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),

    getCategories: builder.query({
      query: () => "categories",
      providesTags: ["Categories"],
    }),

    getCategoryById: builder.query({
      query: (id) => `categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Categories", id }],
    }),

    updateCategoryById: builder.mutation({
      query: ({ id, body }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Categories",
        { type: "Categories", id },
      ],
    }),

    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
  useGetCategoryByIdQuery,
} = categoryAPI;
