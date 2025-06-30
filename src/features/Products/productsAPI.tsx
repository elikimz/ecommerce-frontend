


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the argument type for getProducts query
type GetProductsArgs = {
  name?: string;
  category?: string;
};

export const productAPI = createApi({
  reducerPath: "productAPI",
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
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products/",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    getProducts: builder.query<any[], GetProductsArgs>({
      query: ({ name = "", category = "" } = {}) =>
        `products/?name=${encodeURIComponent(
          name
        )}&category=${encodeURIComponent(category)}&skip=0&limit=100`,
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    updateProductById: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Products",
        { type: "Products", id },
      ],
    }),

    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
} = productAPI;
