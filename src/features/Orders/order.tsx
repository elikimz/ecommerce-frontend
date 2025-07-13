import {
  useState,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/usernavbar";
import Footer from "../../components/Footer";
import { Search } from "lucide-react";
import { useGetProductsQuery } from "../Products/productsAPI";
import { useAddCartItemMutation } from "../Cart&CartItems/cartitemsAPI";
import SearchBar from "../../components/SearchBar";
import { toast } from "react-toastify";
import type { Product } from "../Products/productsAPI"; // ✅ Use shared Product type

const Order = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [filters, setFilters] = useState({ name: "", category: "" });

  const [addCartItem] = useAddCartItemMutation();

  useEffect(() => {
    setFilters({
      name: "",
      category: categoryInput,
    });
    setSearchInput("");
  }, [categoryInput]);

  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery(filters);

  // ✅ Fixed: safely handle both string and object category types
  const uniqueCategories = Array.from(
    new Set(
      products.map((p) =>
        typeof p.category === "object" ? p.category?.name : p.category
      )
    )
  ).filter(Boolean);

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({
      ...prev,
      name: searchTerm,
    }));
    setSearchInput("");
  };

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.stopPropagation();

    const existing = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const alreadyInCart = existing.some(
      (item: { id: string | number }) => item.id === product.id
    );

    if (alreadyInCart) {
      toast.warning(`${product.name} is already in your cart!`);
      return;
    }

    // ✅ Fixed: convert id to number for correct type
    const cartItem = {
      product_id: Number(product.id),
      quantity: 1,
    };

    try {
      await addCartItem(cartItem).unwrap();

      const updated = [...existing, { ...product, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updated));
      localStorage.setItem("cartCount", updated.length.toString());

      window.dispatchEvent(new Event("cartCountUpdated"));

      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart. Try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <UserNavbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              Place Your Order
            </h1>
            <p className="text-base sm:text-lg md:text-xl">
              Select products you want to order below.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar initialSearch={searchInput} onSearch={handleSearch} />
        </section>

        <section className="max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8">
          <div className="bg-gray-100 p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Filter Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter")
                    handleSearch(e.currentTarget.value.trim());
                }}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                value={categoryInput}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCategoryInput(e.target.value)
                }
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="sm:col-span-2 md:col-span-1">
                <button
                  onClick={() => handleSearch(searchInput.trim())}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition text-sm"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold mb-6">Available Products</h2>

          {isLoading && <p>Loading...</p>}
          {error && (
            <p className="text-red-500">
              Error loading products. Please try again.
            </p>
          )}
          {!isLoading && products.length === 0 && !error && (
            <p>No products found.</p>
          )}

          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer"
                  onClick={() => {
                    localStorage.setItem(
                      "selectedProduct",
                      JSON.stringify(product)
                    );
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-48 w-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <div className="text-yellow-500 text-xs">★★★★☆</div>
                    <p className="text-xs text-gray-500 truncate">
                      {product.description}
                    </p>
                    <p className="text-orange-600 font-bold text-sm">
                      KES {product.price.toLocaleString()}
                    </p>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-1.5 rounded-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
