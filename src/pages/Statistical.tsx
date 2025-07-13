import React from "react";
import { format } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Loader2, Package, Users2, ShoppingCart, Layers } from "lucide-react";

// RTK‑Query hooks
import { useGetUsersQuery } from "../features/login/loginAPI";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import { useGetCategoriesQuery } from "../features/Category/categoryAPI";
import { useGetOrdersQuery } from "../features/Orders/orderAPI";

// Type definitions
interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  created_at: string;
}

const brandOrange = "#f97316";
const brandGray = "#4A4A4A";
const chartColors = ["#f97316", "#3b82f6", "#10b981", "#ef4444"];

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
}> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition">
    <div className="p-3 rounded-lg" style={{ background: brandOrange + "20" }}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold" style={{ color: brandGray }}>
        {value}
      </p>
    </div>
  </div>
);

const AdminStatisticsPage: React.FC = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery({});
  const {
    data: categories,
    isLoading: catLoading,
    isError: catError,
  } = useGetCategoriesQuery({});
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetOrdersQuery({});
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsersQuery({});

  const anyLoading =
    productsLoading || catLoading || ordersLoading || usersLoading;
  const anyError = productsError || catError || ordersError || usersError;

  const totalRevenue = (orders as Order[])?.reduce(
    (acc: number, ord: Order) => acc + (ord.total_amount || 0),
    0,
  );

  const orderStatusData = [
    {
      name: "Completed",
      value:
        (orders as Order[])?.filter((o: Order) => o.status === "completed")
          .length || 0,
    },
    {
      name: "Pending",
      value:
        (orders as Order[])?.filter((o: Order) => o.status === "pending")
          .length || 0,
    },
    {
      name: "Cancelled",
      value:
        (orders as Order[])?.filter((o: Order) => o.status === "cancelled")
          .length || 0,
    },
  ];

  const productCategoryDistribution =
    (categories as Category[])?.map((cat: Category) => ({
      name: cat.name,
      value:
        (products as Product[])?.filter(
          (p: Product) => p.category_id === cat.id,
        ).length || 0,
    })) || [];

  const userRegistrationByMonth =
    (users as User[])?.reduce((acc: Record<string, number>, user: User) => {
      const date = new Date(user.created_at);
      const key = format(date, "MMM yyyy");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}) ?? {};

  const userGraphData = Object.entries(userRegistrationByMonth).map(
    ([month, count]) => ({ month, count }),
  );

  if (anyLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );

  if (anyError)
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <p className="text-red-500 font-semibold">
          Failed to load statistics. Please try again.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: brandGray }}>
        Store Statistics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<Package className="w-6 h-6" style={{ color: brandOrange }} />}
          label="Products"
          value={products?.length ?? 0}
        />
        <StatCard
          icon={<Layers className="w-6 h-6" style={{ color: brandOrange }} />}
          label="Categories"
          value={categories?.length ?? 0}
        />
        <StatCard
          icon={
            <ShoppingCart className="w-6 h-6" style={{ color: brandOrange }} />
          }
          label="Orders"
          value={orders?.length ?? 0}
        />
        <StatCard
          icon={<Users2 className="w-6 h-6" style={{ color: brandOrange }} />}
          label="Users"
          value={users?.length ?? 0}
        />
      </div>

      {/* Revenue */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4" style={{ color: brandGray }}>
          Revenue Snapshot
        </h2>
        <p className="text-4xl font-bold" style={{ color: brandOrange }}>
          KES {totalRevenue?.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Updated: {format(new Date(), "dd MMM yyyy HH:mm")}
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart: Order Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: brandGray }}
          >
            Orders by Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {orderStatusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Products by Category */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: brandGray }}
          >
            Products per Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productCategoryDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={brandOrange} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: User Registrations by Month */}
        <div className="bg-white rounded-xl shadow p-6 col-span-1 md:col-span-2">
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: brandGray }}
          >
            User Registrations Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={brandOrange} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatisticsPage;
