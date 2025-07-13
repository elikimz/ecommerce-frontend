import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../features/Orders/orderAPI";
import toast from "react-hot-toast";
import Spinner from "../components/spinner";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  price: number;
}

const OrderPage = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    const storedProductStr = localStorage.getItem("selectedProduct");

    if (!storedProductStr) {
      setStatusMessage({
        type: "error",
        text: "No product information found in local storage",
      });
      return;
    }

    try {
      const product: Product = JSON.parse(storedProductStr);
      if (
        product &&
        typeof product.id === "number" &&
        typeof product.price === "number"
      ) {
        setProductId(product.id);
        setPrice(product.price);
      } else {
        setStatusMessage({
          type: "error",
          text: "Product data in local storage is invalid",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to parse product data from local storage",
      });
    }
  }, []);

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setShippingAddress("");
    setQuantity(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (
      !customerName.trim() ||
      !customerEmail.trim() ||
      !customerPhone.trim() ||
      !shippingAddress.trim()
    ) {
      setStatusMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    if (!productId) {
      setStatusMessage({ type: "error", text: "Product ID is missing" });
      return;
    }

    if (quantity < 1) {
      setStatusMessage({ type: "error", text: "Quantity must be at least 1" });
      return;
    }

    const totalAmount = price * quantity;

    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: "pending",
      order_items: [
        {
          product_id: productId,
          quantity,
          price,
        },
      ],
    };

    try {
      const res = await createOrder(orderData).unwrap();
      toast.success("Order placed successfully!");
      resetForm();
      localStorage.setItem("currentOrder", JSON.stringify(res));
      navigate("/payment");
    } catch {
      toast.error("Failed to place order");
      setStatusMessage({ type: "error", text: "Failed to place order" });
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: 500,
          margin: "2rem auto",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 10,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            color: "#333",
            textAlign: "center",
          }}
        >
          Place Order
        </h1>

        {statusMessage && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: 6,
              color: statusMessage.type === "success" ? "#155724" : "#721c24",
              backgroundColor:
                statusMessage.type === "success" ? "#d4edda" : "#f8d7da",
              border:
                statusMessage.type === "success"
                  ? "1px solid #c3e6cb"
                  : "1px solid #f5c6cb",
              textAlign: "center",
              fontWeight: "600",
            }}
            role="alert"
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="customerName"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="customerEmail"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Email Address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="customerEmail"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="customerPhone"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Phone Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="customerPhone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter your phone number"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Shipping */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="shippingAddress"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Shipping Address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="shippingAddress"
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter shipping address"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="quantity"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Quantity <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val > 0) setQuantity(val);
              }}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
              }}
              required
              disabled={isLoading}
            />
          </div>

          {/* Totals */}
          <div
            style={{
              marginBottom: "1rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#444",
            }}
          >
            Unit Price:{" "}
            <span style={{ color: "#f97316" }}>KES {price.toFixed(2)}</span>
          </div>
          <div
            style={{
              marginBottom: "1.5rem",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#f97316",
              textAlign: "right",
            }}
          >
            Total: KES {(price * quantity).toFixed(2)}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#f97316",
              color: "#fff",
              padding: "0.85rem",
              width: "100%",
              border: "none",
              borderRadius: 8,
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {isLoading && (
              <div style={{ width: 20, height: 20 }}>
                <Spinner />
              </div>
            )}
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>

      <a
        href="https://wa.me/254791337188"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          padding: "16px",
          fontSize: "28px",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          animation: "bounce 1.5s infinite",
        }}
        title="Order via WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </>
  );
};

export default OrderPage;
