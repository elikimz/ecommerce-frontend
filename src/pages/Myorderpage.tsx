import { useGetMyOrdersQuery } from "../features/Orders/orderAPI";

// Define the types for your order data
interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total_amount: number;
  shipping_address: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

const MyOrders = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useGetMyOrdersQuery({
    skip: 0,
    limit: 10,
  }) as { data: Order[]; error: unknown; isLoading: boolean };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-2 text-sm">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-2 text-red-500 text-sm">
        Error loading orders
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 bg-gray-50">
      <h1 className="text-xl font-bold mb-3 text-orange-600">My Orders</h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border-l-2 border-orange-500 rounded shadow-sm p-3"
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-base font-semibold text-orange-700">
                  Order #{order.id}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mb-1">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">Address:</span>{" "}
                  {order.shipping_address}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t border-orange-200 pt-1 mt-1">
                <h3 className="text-sm font-medium mb-1 text-orange-600">
                  Items
                </h3>
                <ul className="space-y-1">
                  {order.order_items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center p-1 bg-orange-50 rounded text-xs"
                    >
                      <span className="font-medium text-orange-800">
                        ID: {item.product_id}
                      </span>
                      <span className="text-gray-700">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        KES {item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-1 pt-1 border-t border-orange-200 text-right">
                <p className="text-sm font-bold text-orange-700">
                  Total: KES {order.total_amount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
