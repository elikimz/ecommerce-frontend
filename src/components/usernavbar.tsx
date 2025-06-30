




import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const count = parseInt(localStorage.getItem("cartCount") || "0", 10);
    setCartCount(count);

    // Listen for updates from other components
    const handleCartUpdate = () => {
      const updatedCount = parseInt(
        localStorage.getItem("cartCount") || "0",
        10
      );
      setCartCount(updatedCount);
    };

    window.addEventListener("cartCountUpdated", handleCartUpdate);
    return () =>
      window.removeEventListener("cartCountUpdated", handleCartUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="shadow font-sans bg-white">
      <TopBar />

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-y-2">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img src="/logo.png" alt="" className="h-8 sm:h-10" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500">
            Smart Indoor Decors
          </h1>
        </div>

        {/* Right Section: Cart & Account */}
        <div className="flex items-center gap-6 relative">
          {/* Cart Icon with Count */}
          <div
            onClick={() => (window.location.href = "/cart")}
            className="relative text-gray-700 hover:text-orange-500 text-xl cursor-pointer"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* My Account Dropdown */}
          <div
            className="flex items-center gap-1 text-xs sm:text-sm cursor-pointer relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
            <span className="text-gray-800 hidden sm:inline">My Account</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden sm:inline" />

            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white shadow border rounded-md w-40 z-50">
                <a
                  href="/account"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </a>
                <a
                  href="/myorders"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Orders
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Links
      <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium py-2 border-t border-gray-200 bg-white">
        <span className="text-orange-500 cursor-pointer">% Today’s Deals</span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          New Arrivals
        </span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          Computers
        </span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          Phones
        </span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          Accessories
        </span>
      </nav> */}
    </header>
  );
};

export default UserNavbar;
