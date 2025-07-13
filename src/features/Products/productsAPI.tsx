import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the argument type for getProducts query
type GetProductsArgs = {
  name?: string;
  category?: string;
};

// Define product types - flexible interface to work with different parts of app
export interface Product {
  id: number | string;
  name: string;
  price: number;
  image_url: string;
  description?: string;
  category?: string | { name: string; id?: number };
  category_id?: number;
  stock?: number;
  colors?: string;
  warranty?: string;
  product_url?: string;
  created_at?: string;
  updated_at?: string;
  images?: { url: string }[];
  videos?: { url: string }[];
  [key: string]: unknown; // Allow additional properties
}

export interface CreateProductData {
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  category?: string;
}

export interface UpdateProductData {
  id: number;
  body: Partial<CreateProductData>;
}

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
    createProduct: builder.mutation<Product, CreateProductData>({
      query: (newProduct) => ({
        url: "products/",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    getProducts: builder.query<Product[], GetProductsArgs>({
      query: ({ name = "", category = "" } = {}) =>
        `products/?name=${encodeURIComponent(
          name,
        )}&category=${encodeURIComponent(category)}&skip=0&limit=100`,
      providesTags: ["Products"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    updateProductById: builder.mutation<Product, UpdateProductData>({
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

    deleteProductById: builder.mutation<{ message: string }, number>({
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
