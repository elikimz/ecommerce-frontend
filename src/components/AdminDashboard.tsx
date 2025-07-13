


import { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
  Bell,
  LayoutDashboard,
  Users,
  Truck,
  BarChart,
  ShoppingCart,
  Menu,
  LogOut,
} from "lucide-react";

const EcommerceDashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 md:z-auto h-full bg-blue-900 text-white p-5 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64`}
      >
        <h1 className="text-2xl font-bold mb-6">Ecommerce Admin</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin-dashboard/"
              className="block p-2 bg-blue-700 hover:bg-blue-800 rounded flex items-center"
              onClick={closeSidebar}
            >
              <LayoutDashboard className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/users"
              className="block p-2 bg-blue-700 hover:bg-blue-800 rounded flex items-center"
              onClick={closeSidebar}
            >
              <Users className="mr-2" /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/categories"
              className="block p-2 bg-blue-700 hover:bg-blue-800 rounded flex items-center"
              onClick={closeSidebar}
            >
              <Truck className="mr-2" /> Category
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/analytics"
              className="block p-2 bg-blue-700 hover:bg-blue-800 rounded flex items-center"
              onClick={closeSidebar}
            >
              <BarChart className="mr-2" /> Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/orders"
              className="block p-2 bg-blue-700 hover:bg-blue-800 rounded flex items-center"
              onClick={closeSidebar}
            >
              <ShoppingCart className="mr-2" /> Orders
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block w-full text-left p-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
            >
              <LogOut className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 bg-gray-100 overflow-auto border-l border-gray-300">
        <div className="flex justify-between items-center mb-8">
          <button
            className="md:hidden p-2 bg-blue-900 text-white rounded"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu />
          </button>
          <h2 className="text-3xl font-bold">Welcome, {role || "Admin"}!</h2>
          <button className="flex items-center p-2 border border-gray-300 rounded hover:bg-gray-200">
            <Bell className="mr-2" /> Notifications
          </button>
        </div>

        {/* Content Frame */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
