


// import { useState, useEffect, type MouseEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Search } from "lucide-react";
// import { useGetProductsQuery } from "../features/Products/productsAPI";
// import SearchBar from "../components/SearchBar";
// import Spinner from "../components/spinner";

// interface Product {
//   id: number;
//   name: string;
//   description?: string;
//   price: number;
//   category?: { name: string };
//   warranty?: string;
//   image_url: string;
// }

// const warrantyColors: Record<string, string> = {
//   "1 year": "text-blue-500",
//   "2 years": "text-green-500",
//   Lifetime: "text-purple-500",
//   "No warranty information": "text-red-500",
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState("");
//   const [categoryInput, setCategoryInput] = useState("");
//   const [filters, setFilters] = useState({ name: "", category: "" });
//   const [sortOption, setSortOption] = useState("");

//   const {
//     data: products = [],
//     isLoading,
//     error,
//   } = useGetProductsQuery(filters);

//   useEffect(() => {
//     setFilters({
//       name: "",
//       category: categoryInput,
//     });
//     setSearchInput("");
//   }, [categoryInput]);

//   const uniqueCategories = Array.from(
//     new Set(products.map((p) => p.category?.name))
//   ).filter(Boolean);

//   const handleSearch = (searchTerm: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       name: searchTerm,
//     }));
//     setSearchInput("");
//   };

//   const handleAddToCart = (e: MouseEvent) => {
//     e.stopPropagation();
//     navigate("/login");
//   };

//   const getSortedProducts = () => {
//     switch (sortOption) {
//       case "A-Z":
//         return [...products].sort((a, b) => a.name.localeCompare(b.name));
//       case "highestPrice":
//         return [...products].sort((a, b) => b.price - a.price);
//       case "lowestPrice":
//         return [...products].sort((a, b) => a.price - b.price);
//       default:
//         return products;
//     }
//   };

//   const sortedProducts = getSortedProducts();

//   const getWarrantyColor = (warranty: string) => {
//     return warrantyColors[warranty] || "text-gray-600";
//   };

//   const orgSchema = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: "Smart Indoor Decors",
//     url: "https://www.smartindoordecors.com",
//     logo: "https://www.smartindoordecors.com/logo.png", // 🟡 make sure this logo URL works
//     sameAs: [
//       "https://www.instagram.com/yourbrand", // Optional: Replace with real links
//       "https://www.facebook.com/yourpage",
//     ],
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
//       <Helmet>
//         <title>Smart Indoor Decors | Buy Trending Products Online</title>
//         <meta
//           name="description"
//           content="Discover trending home decor products at Smart Indoor Decors. Shop affordable, stylish items delivered across Kenya."
//         />
//         <link rel="canonical" href="https://www.smartindoordecors.com/" />
//         <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
//       </Helmet>

//       <Navbar />

//       <main className="flex-grow">
//         <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-12">
//           <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Welcome to Smart Indoor Decors
//             </h1>
//             <p className="text-lg md:text-xl">
//               Shop your favorite products with amazing deals every day
//             </p>
//           </div>
//         </section>

//         <section className="max-w-7xl mx-auto px-4 py-6">
//           <SearchBar initialSearch={searchInput} onSearch={handleSearch} />
//         </section>

//         <section className="max-w-7xl mx-auto px-4 py-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="text-2xl font-semibold mb-6">Search Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter")
//                     handleSearch(e.currentTarget.value.trim());
//                 }}
//               />
//               <select
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 value={categoryInput}
//                 onChange={(e) => setCategoryInput(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 {uniqueCategories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={() => handleSearch(searchInput.trim())}
//                 className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition w-full"
//                 aria-label="Search products"
//               >
//                 <Search className="w-4 h-4" />
//                 Search
//               </button>
//               <select
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//               >
//                 <option value="">Default Sorting</option>
//                 <option value="A-Z">Sort A-Z</option>
//                 <option value="highestPrice">Price: High to Low</option>
//                 <option value="lowestPrice">Price: Low to High</option>
//               </select>
//             </div>
//           </div>
//         </section>

//         <section className="max-w-7xl mx-auto px-4 pb-16">
//           <h2 className="text-2xl font-semibold mb-8">Trending Products</h2>

//           {isLoading && <Spinner />}
//           {error && (
//             <p className="text-center text-sm text-gray-500 py-8">
//               Products are currently unavailable. Please check back later.
//             </p>
//           )}
//           {!isLoading && products.length === 0 && !error && (
//             <p className="text-center text-sm text-gray-500 py-8">
//               No products found.
//             </p>
//           )}

//           {!isLoading && sortedProducts.length > 0 && (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {sortedProducts.map((product: Product) => (
//                 <div
//                   id={`product-${product.id}`}
//                   key={product.id}
//                   className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
//                   onClick={() => navigate("/login")}
//                 >
//                   <div className="overflow-hidden rounded-t-xl bg-gray-200">
//                     <img
//                       src={product.image_url}
//                       alt={product.name}
//                       className="h-48 w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
//                     />
//                   </div>
//                   <div className="p-4 space-y-2">
//                     <h3 className="text-sm font-semibold text-gray-800 truncate">
//                       {product.name}
//                     </h3>
//                     <div className="flex items-center">
//                       <span className="text-yellow-400 text-xs">★★★★☆</span>
//                     </div>
//                     <p className="text-xs text-gray-500 truncate">
//                       {product.description}
//                     </p>
//                     <p className="text-orange-600 font-bold text-lg">
//                       KES {product.price.toLocaleString()}
//                     </p>
//                     <p
//                       className={`text-xs ${getWarrantyColor(
//                         product.warranty || "No warranty information"
//                       )}`}
//                     >
//                       Warranty: {product.warranty || "No warranty information"}
//                     </p>
//                     <button
//                       onClick={handleAddToCart}
//                       className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
//                       aria-label="Add product to cart"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Home;



import { useState, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/spinner";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: { name: string };
  warranty?: string;
  image_url: string;
}

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
    new Set(products.map((p) => p.category?.name))
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

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Smart Indoor Decors",
    url: "https://www.smartindoordecors.com",
    logo: "https://www.smartindoordecors.com/logo.png", // ✅ Ensure this logo exists
    sameAs: [
      "https://www.instagram.com/yourbrand",
      "https://www.facebook.com/yourpage",
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Smart Indoor Decors | Buy Trending Products Online</title>
        <meta
          name="description"
          content="Discover trending home decor products at Smart Indoor Decors. Shop affordable, stylish items delivered across Kenya."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://www.smartindoordecors.com/logo.png"
        />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Smart Indoor Decors
            </h1>
            <p className="text-lg md:text-xl">
              Shop your favorite products with amazing deals every day
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {sortedProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  <div className="overflow-hidden rounded-t-xl bg-gray-200">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-48 w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-xs">★★★★☆</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {product.description}
                    </p>
                    <p className="text-orange-600 font-bold text-lg">
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
                      aria-label="Add product to cart"
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

export default Home;
