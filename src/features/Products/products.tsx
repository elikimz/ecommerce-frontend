import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
  type Product as APIProduct,
} from "./productsAPI";
import { useGetCategoriesQuery } from "../Category/categoryAPI";

/* Cloudinary Credentials */
const CLOUD_NAME = "dvunjxgep"; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "ecommerce_preset"; // Replace with your upload preset

/* Types */
interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ProductImage {
  url: string;
}

interface ProductVideo {
  url: string;
}

interface Product extends Omit<APIProduct, "category"> {
  category_id: number;
  stock: number;
  colors?: string;
  warranty?: string;
  product_url?: string;
  images?: ProductImage[];
  videos?: ProductVideo[];
  created_at: string;
  updated_at: string;
  category?: Category;
}

interface ProductForm {
  name: string;
  description?: string;
  price: number | string;
  category_id: number | string;
  stock: number | string;
  colors?: string;
  warranty?: string;
  image_url?: string;
  image_urls: string[];
  product_url?: string;
  videos: ProductVideo[];
}

/* Helper Functions */
const blankForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  stock: "",
  colors: "",
  warranty: "",
  image_url: "",
  image_urls: [],
  product_url: "",
  videos: [],
};

const uploadToCloudinary = async (
  file: File,
  resource: "image" | "video"
): Promise<string> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resource}/upload`;
  try {
    const res = await axios.post(url, data);
    return res.data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

/* Component */
const Product: React.FC = () => {
  /* State */
  const [formData, setFormData] = useState<ProductForm>(() => {
    const savedFormData = sessionStorage.getItem("productFormData");
    return savedFormData ? JSON.parse(savedFormData) : blankForm;
  });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewVideos, setPreviewVideos] = useState<string[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  /* API Hooks */
  const { data: categories = [] } = useGetCategoriesQuery({});
  const {
    data: products = [],
    isLoading,
    error: getError,
  } = useGetProductsQuery({});
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductByIdMutation();
  const [deleteProduct] = useDeleteProductByIdMutation();

  /* Save form data to sessionStorage whenever it changes */
  useEffect(() => {
    sessionStorage.setItem("productFormData", JSON.stringify(formData));
  }, [formData]);

  /* Populate form on edit */
  useEffect(() => {
    if (selectedProductId === null) {
      setFormData(blankForm);
      setPreviewImage(null);
      setPreviewImages([]);
      setPreviewVideos([]);
    } else {
      const product = products.find(
        (p: APIProduct) => p.id === selectedProductId
      );
      if (product) {
        setFormData({
          name: product.name,
          description: product.description || "",
          price: product.price,
          category_id: product.category_id ?? 0,
          stock: product.stock ?? 0,
          colors: product.colors || "",
          warranty: product.warranty || "",
          image_url: product.image_url || "",
          image_urls: product.images?.map((img: ProductImage) => img.url) || [],
          product_url: product.product_url || "",
          videos: product.videos || [],
        });
        setPreviewImage(product.image_url || null);
        setPreviewImages(
          product.images?.map((img: ProductImage) => img.url) || []
        );
        setPreviewVideos(
          product.videos?.map((vid: ProductVideo) => vid.url) || []
        );
      }
    }
  }, [products, selectedProductId]);

  /* Handlers */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "price" || name === "stock" || name === "category_id"
        ? value === ""
          ? ""
          : Number(value)
        : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    isMainImage: boolean = true
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadToCloudinary(file, "image")
      );
      const urls = await Promise.all(uploadPromises);
      if (isMainImage) {
        setPreviewImage(urls[0]);
        setFormData((prev) => ({ ...prev, image_url: urls[0] }));
      } else {
        setPreviewImages((prev) => [...prev, ...urls]);
        setFormData((prev) => ({
          ...prev,
          image_urls: [...prev.image_urls, ...urls],
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed");
    }
  };

  const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadToCloudinary(file, "video")
      );
      const urls = await Promise.all(uploadPromises);
      setPreviewVideos((prev) => [...prev, ...urls]);
      setFormData((prev) => ({
        ...prev,
        videos: urls.map((url) => ({ url })),
      }));
    } catch (error) {
      console.error("Video upload failed:", error);
      toast.error("Video upload failed");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.category_id === "" || Number(formData.category_id) <= 0)
      return toast.error("Invalid Category");
    if (formData.stock === "" || Number(formData.stock) < 0)
      return toast.error("Stock cannot be negative");
    if (formData.price === "" || Number(formData.price) < 0)
      return toast.error("Price cannot be negative");

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category_id: Number(formData.category_id),
        stock: Number(formData.stock),
        colors: formData.colors,
        warranty: formData.warranty,
        image_url: formData.image_url,
        image_urls: formData.image_urls,
        video_urls: formData.videos.map((video) => video.url),
      };

      if (selectedProductId) {
        await updateProduct({ id: selectedProductId, body: payload }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(payload).unwrap();
        toast.success("Product created successfully!");
      }

      setFormData(blankForm);
      setSelectedProductId(null);
      setPreviewImage(null);
      setPreviewImages([]);
      setPreviewVideos([]);
      sessionStorage.removeItem("productFormData");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: APIProduct) => {
    setSelectedProductId(product.id as number);
  };

  const confirmDeleteProduct = async () => {
    if (confirmDeleteId !== null) {
      try {
        await deleteProduct(confirmDeleteId).unwrap();
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete product");
      }
      setConfirmDeleteId(null);
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-4xl font-bold mb-8 text-orange-600">
        Products Management
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mb-12 border border-orange-300 p-8 rounded-lg shadow-lg bg-white"
      >
        <h3 className="text-2xl font-semibold mb-6 text-orange-700">
          {selectedProductId ? "Update Product" : "Create New Product"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block font-medium mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Price (KES) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min={0}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select a category</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min={0}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter available stock"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Colors</label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter colors, separated by commas"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Warranty</label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter product warranty"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter product description (optional)"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Product URL</label>
            <input
              type="url"
              name="product_url"
              value={formData.product_url}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter product URL (optional)"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Main Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true)}
              className="mb-4"
              aria-label="Upload main product image"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-xs rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Child Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, false)}
              className="mb-4"
              aria-label="Upload child images"
              multiple
            />
            <div className="flex flex-wrap gap-4">
              {previewImages.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Videos</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="mb-4"
              aria-label="Upload videos"
              multiple
            />
            <div className="flex flex-wrap gap-4">
              {previewVideos.map((vid: string, idx: number) => (
                <video
                  key={idx}
                  src={vid}
                  controls
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
        >
          {selectedProductId
            ? isUpdating
              ? "Updating..."
              : "Update Product"
            : isCreating
            ? "Creating..."
            : "Create Product"}
        </button>
        {selectedProductId && (
          <button
            type="button"
            onClick={() => {
              setSelectedProductId(null);
              setFormData(blankForm);
              setPreviewImage(null);
              setPreviewImages([]);
              setPreviewVideos([]);
              sessionStorage.removeItem("productFormData");
            }}
            className="mt-3 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
          >
            Cancel Edit
          </button>
        )}
      </form>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-orange-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Price (KES)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Colors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Warranty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading && (
              <tr>
                <td colSpan={10} className="text-center py-8">
                  Loading products...
                </td>
              </tr>
            )}
            {getError && (
              <tr>
                <td colSpan={10} className="text-center py-8 text-red-600">
                  Error loading products.
                </td>
              </tr>
            )}
            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-8 text-gray-600">
                  No products found.
                </td>
              </tr>
            )}
            {products.map((product: APIProduct) => (
              <tr key={product.id as React.Key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                  {product.description || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {typeof product.category === "object" && product.category !== null && "name" in product.category
                    ? product.category.name
                    : `ID: ${product.category_id}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.colors || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.warranty || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.created_at ? formatDate(product.created_at) : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.updated_at ? formatDate(product.updated_at) : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-1">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-orange-400 hover:bg-orange-500 text-white rounded transition"
                    aria-label={`Edit ${product.name}`}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(product.id as number)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                    aria-label={`Delete ${product.name}`}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-6 text-red-600">
              Confirm Delete
            </h3>
            <p className="mb-8 text-gray-700">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
