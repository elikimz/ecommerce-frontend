import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Type definitions
export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: number;
  cart_items: CartItem[];
}

export interface CartResponse {
  cart_items: CartItem[];
}

export const cartAPI = createApi({
  reducerPath: "cartAPI",
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
  tagTypes: ["Cart", "CartItems"],
  endpoints: (builder) => ({
    // 🔹 GET /cart/ — Fetch current user's cart
    getCart: builder.query<CartResponse, void>({
      query: () => "cart/",
      providesTags: ["Cart", "CartItems"],
    }),

    // 🔹 POST /cart/ — Create new cart (if needed)
    createCart: builder.mutation({
      query: () => ({
        url: "cart/",
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 DELETE /cart/ — Delete/clear cart
    deleteCart: builder.mutation({
      query: () => ({
        url: "cart/",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "CartItems"],
    }),

    // 🔹 POST /cart/items — Add item to cart
    addCartItem: builder.mutation({
      query: (item: { product_id: number; quantity: number }) => ({
        url: "cart/items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["CartItems"],
    }),

    // 🔹 PUT /cart/items — Update cart item quantity
    updateCartItem: builder.mutation({
      query: (item: { product_id: number; quantity: number }) => ({
        url: "cart/items",
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["CartItems"],
    }),

    // 🔹 DELETE /cart/items/{product_id} — Remove item
    deleteCartItem: builder.mutation({
      query: (productId: number) => ({
        url: `cart/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CartItems"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useDeleteCartMutation,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartAPI;
