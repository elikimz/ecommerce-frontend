




// App.tsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Register from "./features/Register/register";
import LoginForm from "./features/login/login";
import ErrorPage from "./components/Error";
import EcommerceDashboard from "./components/AdminDashboard";
import UsersPage from "./pages/users";
import CategoryPage from "./features/Category/category";
import Product from "./features/Products/products";
import ProductDetail from "./pages/Productdetails";
import Order from "./features/Orders/order";
import OrderPage from "./pages/bookorder";
import CartPage from "./features/Cart&CartItems/cartItems";
import InactivityLogout from "./components/ProtectedRoute";
import ProfilePage from "./pages/profilepage";
import MyOrders from "./pages/Myorderpage";
import MpesaPaymentPage from "./features/Empesa/Empesa";
import SuccessPage from "./pages/sucess";
import MyOrdersPage from "./pages/Myorders";
import AdminOrderManagePage from "./pages/Adminorders";
import AdminStatisticsPage from "./pages/Statistical";
import About from "./pages/About";
import Blog from "./pages/Blogs";
import FAQ from "./pages/Faq";
import Shop from "./pages/Shop";
import TermsAndConditions from "./pages/Terms";
import PrivacyPolicy from "./pages/privacy";
import Services from "./pages/services";
import Testimonial from "./pages/Testimonial";
import Contact from "./pages/contact";
import ReceiptPage from "./pages/receipt";
import ProductPage from "./pages/productPage";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: (
      <InactivityLogout>
        <Home />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <InactivityLogout>
        <Register />
      </InactivityLogout>
    ),
  },
  {
    path: "/login",
    element: (
      <InactivityLogout>
        <LoginForm />
      </InactivityLogout>
    ),
  },

  // User Routes
  {
    path: "/account",
    element: (
      <InactivityLogout>
        <ProfilePage />
      </InactivityLogout>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <InactivityLogout>
        <MyOrders />
      </InactivityLogout>
    ),
  },
  {
    path: "/public-product/:productId",
    element: (
      <InactivityLogout>
        <ProductPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <InactivityLogout>
        <ProductDetail />
      </InactivityLogout>
    ),
  },
  {
    path: "/payment",
    element: (
      <InactivityLogout>
        <MpesaPaymentPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/success",
    element: (
      <InactivityLogout>
        <SuccessPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/customer-dashboard",
    element: (
      <InactivityLogout>
        <Order />
      </InactivityLogout>
    ),
  },
  {
    path: "/order",
    element: (
      <InactivityLogout>
        <OrderPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/cart",
    element: (
      <InactivityLogout>
        <CartPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/myorders",
    element: (
      <InactivityLogout>
        <MyOrdersPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/about",
    element: (
      <InactivityLogout>
        <About />
      </InactivityLogout>
    ),
  },
  {
    path: "/blog",
    element: (
      <InactivityLogout>
        <Blog />
      </InactivityLogout>
    ),
  },
  {
    path: "/faq",
    element: (
      <InactivityLogout>
        <FAQ />
      </InactivityLogout>
    ),
  },
  {
    path: "/shop",
    element: (
      <InactivityLogout>
        <Shop />
      </InactivityLogout>
    ),
  },

  {
    path: "/terms",
    element: (
      <InactivityLogout>
        <TermsAndConditions />
      </InactivityLogout>
    ),
  },
  {
    path: "/privacy",
    element: (
      <InactivityLogout>
        <PrivacyPolicy />
      </InactivityLogout>
    ),
  },
  {
    path: "/services",
    element: (
      <InactivityLogout>
        <Services />
      </InactivityLogout>
    ),
  },
  {
    path: "/testimonials",
    element: (
      <InactivityLogout>
        <Testimonial />
      </InactivityLogout>
    ),
  },
  {
    path: "/contact",
    element: (
      <InactivityLogout>
        <Contact />
      </InactivityLogout>
    ),
  },
  {
    path: "/receipt/:orderId",
    element: (
      <InactivityLogout>
        <ReceiptPage />
      </InactivityLogout>
    ),
  },

  // Admin Dashboard Routes
  {
    path: "/admin-dashboard",
    element: (
      <InactivityLogout>
        <EcommerceDashboard />
      </InactivityLogout>
    ),

    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminStatisticsPage />, // 👈 Dashboard page
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "categories",
        element: <CategoryPage />,
      },
      {
        path: "analytics",
        element: <Product />,
      },
      {
        path: "orders",
        element: <AdminOrderManagePage />,
      },
    ],
  },

  // Catch-all 404 route
  {
    path: "*",
    element: <ErrorPage code="404" message="Page Not Found" />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
