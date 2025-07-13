import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../features/Orders/orderAPI";
import { Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Type definitions
interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
  };
}

interface OrderData {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  status: string;
  created_at: string;
  total_amount: number;
  order_items: OrderItem[];
}

const ReceiptPage: React.FC = () => {
  const { orderId } = useParams();
  const receiptRef = useRef<HTMLDivElement>(null);

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId ?? "") as {
    data: OrderData;
    isLoading: boolean;
    isError: boolean;
  };

  const formatMoney = (num: number) =>
    `KES ${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#fff",
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SmartIndoorDecors-Receipt-${orderId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Failed to load receipt.
      </div>
    );
  }

  return (
    <div className="p-4 bg-pink-50 min-h-screen flex flex-col items-center justify-center">
      {/* RECEIPT CARD */}
      <div
        ref={receiptRef}
        className="bg-white border border-pink-200 rounded-md w-full max-w-3xl p-6 text-gray-800 shadow-xl"
      >
        {/* Logo & Brand */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <img
            src="/logo.png"
            alt="Smart Indoor Decors"
            className="w-12 h-12 object-contain"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold text-pink-700">
              Smart Indoor Decors
            </h2>
            <p className="text-xs text-pink-400">Your Home, Our Touch</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold text-center text-orange-500 mb-4">
          Official Receipt
        </h1>

        {/* Customer & Order */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="font-semibold text-pink-700">Customer Details</p>
            <p>{order.customer_name}</p>
            <p>{order.customer_email}</p>
            <p>{order.customer_phone}</p>
            <p>{order.shipping_address}</p>
          </div>
          <div>
            <p className="font-semibold text-pink-700">Order Details</p>
            <p>Order ID: #{order.id}</p>
            <p>Status: {order.status}</p>
            <p>
              Date:{" "}
              {new Date(order.created_at).toLocaleDateString("en-KE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Total: {formatMoney(order.total_amount)}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-xs border border-pink-200 mt-4">
          <thead className="bg-pink-100 text-pink-800">
            <tr>
              <th className="border border-pink-200 px-2 py-1 text-left">
                Product
              </th>
              <th className="border border-pink-200 px-2 py-1 text-center">
                Qty
              </th>
              <th className="border border-pink-200 px-2 py-1 text-right">
                Price
              </th>
              <th className="border border-pink-200 px-2 py-1 text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((item: OrderItem, index: number) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-pink-50"}
              >
                <td className="border border-pink-100 px-2 py-1">
                  {item.product?.name ?? `#${item.product_id}`}
                </td>
                <td className="border border-pink-100 px-2 py-1 text-center">
                  {item.quantity}
                </td>
                <td className="border border-pink-100 px-2 py-1 text-right">
                  {formatMoney(item.price)}
                </td>
                <td className="border border-pink-100 px-2 py-1 text-right">
                  {formatMoney(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-4 text-right text-sm font-bold text-pink-800">
          Grand Total: {formatMoney(order.total_amount)}
        </div>

        {/* Thank You */}
        <p className="mt-6 text-center text-xs text-pink-500 italic">
          Thank you for shopping with Smart Indoor Decors!
        </p>

        {/* Contact Info */}
        <div className="mt-4 text-xs text-pink-400 text-center">
          📞 +254&nbsp;741&nbsp;769&nbsp;787 | 📧 smartindoordecors@gmail.com
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadReceipt}
        className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default ReceiptPage;
