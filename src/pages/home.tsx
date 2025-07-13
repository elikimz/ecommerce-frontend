import { useState, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/spinner";
import SEO from "../components/seo/SEO";
import {
  createOrganizationSchema,
  createWebsiteSchema,
} from "../components/seo/schemas";
import Image from "../components/ui/Image";

const warrantyColors: Record<string, string> = {
  "1 year": "text-blue-500",
  "2 years": "text-green-500",
  Lifetime: "text-purple-500",
  "No warranty information": "text-red-500",
};

const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [filters, setFilters] = useState({ name: "", category: "" });
  const [sortOption, setSortOption] = useState("");
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery(filters);

  useEffect(() => {
    setFilters({
      name: "",
      category: categoryInput,
    });
    setSearchInput("");
  }, [categoryInput]);

  const uniqueCategories = Array.from(
    new Set(
      products.map((p) =>
        typeof p.category === "object" &&
        p.category !== null &&
        "name" in p.category
          ? p.category.name
          : ""
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

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    navigate("/login");
  };

  const getSortedProducts = () => {
    switch (sortOption) {
      case "A-Z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "highestPrice":
        return [...products].sort((a, b) => b.price - a.price);
      case "lowestPrice":
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts();

  const getWarrantyColor = (warranty: string) => {
    return warrantyColors[warranty] || "text-gray-600";
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [createOrganizationSchema(), createWebsiteSchema()],
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <SEO
        title="Smart Indoor Decors | Buy Trending Products Online"
        description="Discover trending home decor products at Smart Indoor Decors. Shop affordable, stylish items delivered across Kenya with fast delivery and best prices."
        keywords="home decor, interior design, furniture, Kenya, online shopping, smart decor, trending products, affordable furniture"
        structuredData={combinedSchema}
        canonical="https://www.smartindoordecors.com/"
      />
      <Navbar />
      <main className="flex-grow">
        <section
          className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-12"
          aria-label="Homepage hero section"
        >
          <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Smart Indoor Decors
            </h1>
            <p className="text-lg md:text-xl">
              Shop your favorite home decor products with amazing deals every
              day. Fast delivery across Kenya.
            </p>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar initialSearch={searchInput} onSearch={handleSearch} />
        </section>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Search Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <input
                type="text"
                placeholder="Search for products..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleSearch(e.currentTarget.value.trim());
                }}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleSearch(searchInput.trim())}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition w-full"
                aria-label="Search products"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Default Sorting</option>
                <option value="A-Z">Sort A-Z</option>
                <option value="highestPrice">Price: High to Low</option>
                <option value="lowestPrice">Price: Low to High</option>
              </select>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold mb-8">Trending Products</h2>
          {isLoading && <Spinner />}
          {error && (
            <p className="text-center text-sm text-gray-500 py-8">
              Products are currently unavailable. Please check back later.
            </p>
          )}
          {!isLoading && products.length === 0 && !error && (
            <p className="text-center text-sm text-gray-500 py-8">
              No products found.
            </p>
          )}
          {!isLoading && sortedProducts.length > 0 && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              role="grid"
              aria-label="Product catalog"
            >
              {sortedProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate("/login")}
                  role="gridcell"
                >
                  <div className="overflow-hidden rounded-t-xl bg-gray-200">
                    <Image
                      src={product.image_url}
                      alt={`${product.name} - ${
                        typeof product.category === "object" &&
                        product.category !== null &&
                        "name" in product.category
                          ? product.category.name
                          : "Home Decor"
                      } product available at Smart Indoor Decors`}
                      className="h-48 w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                      loading="lazy"
                      width={192}
                      height={192}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <div
                      className="flex items-center"
                      aria-label="Product rating"
                    >
                      <span
                        className="text-yellow-400 text-xs"
                        role="img"
                        aria-label="4 out of 5 stars"
                      >
                        ★★★★☆
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {product.description ||
                        `Quality ${
                          typeof product.category === "object" &&
                          product.category !== null &&
                          "name" in product.category
                            ? product.category.name
                            : "home decor"
                        } product`}
                    </p>
                    <p
                      className="text-orange-600 font-bold text-lg"
                      aria-label={`Price: ${product.price} Kenyan shillings`}
                    >
                      KES {product.price.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs ${getWarrantyColor(
                        product.warranty || "No warranty information"
                      )}`}
                    >
                      Warranty: {product.warranty || "No warranty information"}
                    </p>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
