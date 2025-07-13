import React, { useState } from "react";
import {
  useGetOrdersQuery,
  useDeleteOrderByIdMutation,
  useUpdateOrderByIdMutation,
} from "../features/Orders/orderAPI";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Trash2, Pencil, Loader2, Save } from "lucide-react";

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

const brandOrange = "#f97316";
const statusOptions = ["pending", "completed", "cancelled"];

const AdminOrderManagePage: React.FC = () => {
  const {
    data: rawOrders,
    isLoading,
    isError,
    refetch,
  } = useGetOrdersQuery({});

  // Type assertion to ensure TypeScript knows the type of rawOrders
  const orders: Order[] = (rawOrders as Order[] | undefined) ?? [];

  // Sort the orders by created_at date
  const sortedOrders = [...orders].sort(
    (a: Order, b: Order) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderByIdMutation();
  const [updateOrder] = useUpdateOrderByIdMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingStatus, setEditingStatus] = useState<string>("");
  const [editingShippingAddress, setEditingShippingAddress] =
    useState<string>("");
  const [editingTotalAmount, setEditingTotalAmount] = useState<number>(0);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this order?")) return;
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const startEdit = (order: Order) => {
    setEditingId(order.id);
    setEditingStatus(order.status);
    setEditingShippingAddress(order.shipping_address);
    setEditingTotalAmount(order.total_amount);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingStatus("");
    setEditingShippingAddress("");
    setEditingTotalAmount(0);
  };

  const saveStatusChange = async () => {
    if (editingId === null) {
      toast.error("No order selected for update.");
      return;
    }

    const payload = {
      total_amount: editingTotalAmount,
      shipping_address: editingShippingAddress,
      status: editingStatus,
    };

    try {
      await updateOrder({ id: editingId, data: payload }).unwrap();
      toast.success("Order updated");
      cancelEdit();
    } catch {
      toast.error("Failed to update order");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <p className="text-red-500">Error fetching orders.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h1
        className="text-2xl font-semibold mb-4"
        style={{ color: brandOrange }}
      >
        Order Management
      </h1>

      {sortedOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">User ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Shipping</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Created</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#{order.id}</td>
                  <td className="py-2 px-4">{order.user_id}</td>
                  <td className="py-2 px-4">{order.customer_name}</td>
                  <td className="py-2 px-4">{order.customer_email}</td>
                  <td className="py-2 px-4">{order.customer_phone}</td>
                  <td
                    className="py-2 px-4 font-semibold"
                    style={{ color: brandOrange }}
                  >
                    {editingId === order.id ? (
                      <input
                        type="number"
                        value={editingTotalAmount}
                        onChange={(e) =>
                          setEditingTotalAmount(Number(e.target.value))
                        }
                        className="w-24 px-1 border rounded"
                      />
                    ) : (
                      `KES ${order.total_amount.toLocaleString()}`
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingId === order.id ? (
                      <input
                        type="text"
                        value={editingShippingAddress}
                        onChange={(e) =>
                          setEditingShippingAddress(e.target.value)
                        }
                        className="w-36 px-1 border rounded"
                      />
                    ) : (
                      order.shipping_address
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingId === order.id ? (
                      <select
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-500">
                    {format(new Date(order.created_at), "dd MMM yyyy, hh:mm a")}
                  </td>
                  <td className="py-2 px-4 flex gap-2 items-center">
                    {editingId === order.id ? (
                      <>
                        <button
                          onClick={saveStatusChange}
                          className="flex items-center gap-1 text-green-600 hover:text-green-800"
                        >
                          <Save size={16} />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-500 hover:text-gray-700"
                          title="Cancel"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(order)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(order.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagePage;
