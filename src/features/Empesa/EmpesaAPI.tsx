import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface StkPushPayload {
  phone: string; // E.164 format e.g. "254712345678"
  amount: number; // Amount in KES
  order_id: number; // Your order ID
}

export interface MpesaCallbackPayload {
  // shape not strictly required for client, provide any for dev tools
  Body: unknown;
}

export const mpesaAPI = createApi({
  reducerPath: "mpesaAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-backend-yeq9.onrender.com/",
    prepareHeaders: (headers) => {
      // Attach auth token if you want the backend to verify the user
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    // 1️⃣  Initiate STK Push (Lipa‑na‑M‑PESA Online)
    initiateStkPush: builder.mutation<
      unknown, // response type — update with your backend DTO
      StkPushPayload
    >({
      query: ({ phone, amount, order_id }) => ({
        url: "mpesa/payments/stk-push",
        method: "POST",
        params: { phone, amount, order_id }, // Send as query parameters
      }),
      invalidatesTags: ["Payments"],
    }),

    // 2️⃣  Manually hit callback (mostly for sandbox testing)
    mpesaCallback: builder.mutation<unknown, MpesaCallbackPayload>({
      query: (body) => ({
        url: "mpesa/payments/callback",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useInitiateStkPushMutation, useMpesaCallbackMutation } =
  mpesaAPI;
