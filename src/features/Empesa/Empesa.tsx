import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaMobileAlt } from "react-icons/fa";

const safGreen = "#00A82D";

const PaybillPaymentPage = () => {
  const [, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("currentOrder");
    if (!storedOrder) {
      toast.error("Order not found in local storage");
      return;
    }

    try {
      const order = JSON.parse(storedOrder);
      setAmount(order.total_amount ?? 0);
    } catch {
      toast.error("Invalid order format in local storage");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center space-y-6">
        <FaMobileAlt className="text-5xl text-green-600 mx-auto" />
        <h1 className="text-2xl font-bold" style={{ color: safGreen }}>
          Order Placed Successfully
        </h1>
        <p className="text-gray-700 text-sm">
          Your order has been successfully created. You’ll be contacted shortly
          for delivery.
          <br className="hidden sm:block" />
          Thank you for shopping with Smart Indoor Decors.
        </p>
        <div className="text-sm text-gray-600">
          For any queries:
          <br />
          📞 <span className="text-black font-medium">+254 741 769 787</span>
          <br />
          📧{" "}
          <span className="text-black font-medium">
            smartindoordecors@gmail.com
          </span>
        </div>

        {/* ✅ Go Back Home Button */}
        <button
          onClick={() => navigate("/customer-dashboard")}
          className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default PaybillPaymentPage;
