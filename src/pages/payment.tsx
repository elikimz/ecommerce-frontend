
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPhoneAlt } from "react-icons/fa";

const PaymentPage = () => {
  return (
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
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#f97316",
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
          fontWeight: 600,
        }}
      >
        <FaArrowLeft style={{ marginRight: 6 }} />
        Back to Home
      </Link>

      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        Complete Your Payment
      </h1>

      <div style={{ marginBottom: "1rem", lineHeight: 1.8 }}>
        <strong>Amount:</strong>{" "}
        <span style={{ color: "#f97316" }}>KES 1,500</span>{" "}
        {/* You can dynamically get this later */}
        <br />
        <strong>Paybill:</strong> 123456
        <br />
        <strong>Account:</strong> Your Order ID / Phone Number
        <br />
        <strong>Number:</strong>{" "}
        <a
          href="tel:+254791337188"
          style={{ color: "#25D366", textDecoration: "none" }}
        >
          <FaPhoneAlt style={{ marginRight: 4 }} />
          +254 791 337188
        </a>
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "#f8fafc",
          border: "1px dashed #f97316",
          borderRadius: 8,
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#555",
        }}
      >
        After payment, you will receive a confirmation SMS. We’ll process your
        order immediately.
      </div>

      <button
        style={{
          backgroundColor: "#f97316",
          color: "#fff",
          padding: "0.85rem",
          width: "100%",
          border: "none",
          borderRadius: 8,
          fontSize: "1.1rem",
          fontWeight: "700",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#dc6b13")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#f97316")
        }
        onClick={() => alert("Thanks! We'll confirm your order shortly.")}
      >
        I’ve Paid
      </button>
    </div>
  );
};

export default PaymentPage;
