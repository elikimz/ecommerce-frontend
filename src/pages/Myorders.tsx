import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import UserNavbar from "../components/usernavbar";
import Spinner from "../components/spinner";
import { useGetMyOrdersQuery } from "../features/Orders/orderAPI";

// Type definitions
interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  total_amount: number;
  shipping_address: string;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

// Brand colours
const brandOrange = "#f97316"; // primary accent
const brandGray = "#4A4A4A"; // secondary text

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyOrdersQuery({});

  if (isLoading) return <Spinner />;

  if (isError) {
    console.error(error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">
          Failed to load your orders.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded bg-orange-500 text-white shadow hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <>
        <UserNavbar />
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <p className="text-gray-500 text-lg">You have no orders yet.</p>
        </div>
      </>
    );
  }

  return (
    <Fragment>
      <UserNavbar />
      <main className="min-h-screen bg-white px-4 py-10">
        <h1 className="text-2xl font-bold mb-6" style={{ color: brandGray }}>
          My Orders
        </h1>

        <div className="space-y-6">
          {(orders as Order[]).map((order: Order) => (
            <section
              key={order.id}
              className="border rounded-xl shadow-sm p-4 md:p-6 space-y-4 hover:shadow-md transition"
            >
              {/* Order header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="font-medium text-gray-700">
                      #{order.id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on:{" "}
                    {format(new Date(order.created_at), "dd MMM yyyy HH:mm")}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white capitalize ${
                    order.status === "completed"
                      ? "bg-green-600"
                      : order.status === "cancelled"
                        ? "bg-red-500"
                        : order.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items table */}
              <div className="divide-y rounded-lg overflow-hidden border">
                {order.order_items.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center gap-4 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/product/${item.product_id}`)}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="col-span-2 w-16 h-16 object-cover rounded-md border"
                    />

                    {/* Details */}
                    <div className="col-span-7 md:col-span-8">
                      <p className="font-medium text-sm text-gray-800 mb-1 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {item.product.description}
                      </p>
                    </div>

                    {/* Qty & Price */}
                    <div className="col-span-3 md:col-span-2 text-right">
                      <p className="text-sm text-gray-700">x{item.quantity}</p>
                      <p
                        className="font-semibold"
                        style={{ color: brandOrange }}
                      >
                        KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & shipping */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Shipping to:{" "}
                  <span className="text-gray-700">
                    {order.shipping_address}
                  </span>
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ color: brandOrange }}
                >
                  Total: KES {order.total_amount.toLocaleString()}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </Fragment>
  );
};

export default MyOrdersPage;
