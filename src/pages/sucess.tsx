import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const safGreen = "#00A82D";
const safGrey = "#4A4A4A";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center space-y-6">
        <CheckCircle size={64} color={safGreen} className="mx-auto" />
        <h1 className="text-2xl font-bold" style={{ color: safGreen }}>
          Payment Successful!
        </h1>
        <p className="text-sm text-gray-600">
          Thank you for your payment. You will receive a confirmation SMS from
          M-PESA shortly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-md font-semibold text-white"
            style={{ background: safGreen }}
          >
            Go to Home
          </Link>
          <Link
            to="/myorders"
            className="px-4 py-2 rounded-md font-semibold text-white"
            style={{ background: safGrey }}
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
