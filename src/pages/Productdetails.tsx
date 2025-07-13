import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "../features/Products/productsAPI";
import { useAddCartItemMutation } from "../features/Cart&CartItems/cartitemsAPI";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import UserNavbar from "../components/usernavbar";

// Local interfaces
interface ProductImage {
  url: string;
}

interface ProductVideo {
  url: string;
}



const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? Number(id) : null;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId!, { skip: productId === null });

  const [addToCart, { isLoading: isAdding }] = useAddCartItemMutation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image_url);
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify({ id: product.id, price: product.price })
      );
    }
  }, [product]);

  const handleImageHover = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setSelectedVideo(null);
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const rotateImage = (direction: "left" | "right") => {
    setRotationAngle((prevAngle) =>
      direction === "left" ? prevAngle - 90 : prevAngle + 90
    );
  };

  if (isLoading) return <Spinner />;

  if (isError || !product) {
    return (
      <p className="p-6 text-center text-lg text-red-500">
        Product not found or failed to load.
      </p>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({ product_id: Number(product.id), quantity: 1 }).unwrap();
      const currentCount = parseInt(
        localStorage.getItem("cartCount") || "0",
        10
      );
      const newCount = currentCount + 1;
      localStorage.setItem("cartCount", newCount.toString());
      window.dispatchEvent(new Event("cartCountUpdated"));
      toast.success("✅ Product added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("❌ Failed to add product to cart.");
    }
  };

  const handleOrderNow = () => {
    navigate("/order");
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image + Gallery Section */}
          <div>
            <div className="w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden shadow-sm mb-4 relative">
              {selectedImage && !selectedVideo && (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-6"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                />
              )}
              {selectedVideo && (
                <video
                  controls
                  className="w-full h-full object-contain p-6"
                  src={selectedVideo}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={() => rotateImage("left")}
                  className="bg-gray-800 text-white p-2 rounded-full shadow"
                >
                  ←
                </button>
                <button
                  onClick={() => rotateImage("right")}
                  className="bg-gray-800 text-white p-2 rounded-full shadow"
                >
                  →
                </button>
              </div>
            </div>
            {/* Child Images and Video Preview */}
            <div className="flex flex-wrap gap-4">
              <img
                src={product.image_url}
                alt={`product-main`}
                className="w-24 h-24 object-cover rounded-md border cursor-pointer"
                onClick={() => handleImageHover(product.image_url)}
              />
              {product.images?.map((img: ProductImage, idx: number) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`product-img-${idx}`}
                  className="w-24 h-24 object-cover rounded-md border cursor-pointer"
                  onClick={() => handleImageHover(img.url)}
                />
              ))}
              {product.videos?.map((vid: ProductVideo, idx: number) => (
                <div
                  key={idx}
                  className="w-24 h-24 rounded-md border cursor-pointer"
                  onClick={() => handleVideoClick(vid.url)}
                >
                  <video className="w-full h-full object-cover rounded-md">
                    <source src={vid.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
            {!product.images?.length && !product.videos?.length && (
              <p className="text-center text-gray-500">
                No additional images or videos available.
              </p>
            )}
          </div>
          {/* Details Section */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-yellow-500 text-lg">★★★★☆</div>
                <span className="text-sm text-gray-500">(24 reviews)</span>
              </div>
              <p className="text-gray-600 text-base mb-4">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-orange-500 mb-2">
                KES {product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Category:{" "}
                {typeof product.category === "object" &&
                product.category &&
                "name" in product.category
                  ? product.category.name
                  : product.category || "Uncategorized"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                In stock: {product.stock || "N/A"}
              </p>
              {/* Colors Available */}
              {product.colors && product.colors.trim() && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500">Colors:</span>
                  {product.colors.split(",").map((col: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-200 rounded text-xs"
                    >
                      {col.trim()}
                    </span>
                  ))}
                </div>
              )}
              {/* Warranty */}
              {product.warranty && (
                <p className="text-sm text-gray-500 mb-2">
                  Warranty: {product.warranty}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition shadow flex items-center justify-center"
              >
                {isAdding ? <Spinner /> : "Add to Cart"}
              </button>
              <button
                onClick={handleOrderNow}
                className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition shadow flex items-center justify-center"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
