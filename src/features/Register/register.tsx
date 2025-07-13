import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRegisterUserMutation } from "../Register/registerAPI";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

// Inline FunnySpinner component: 3 bouncing orange dots with delay
const Spinner = () => (
  <div className="flex space-x-2 justify-center items-center">
    {[...Array(3)].map((_, i) => (
      <span
        key={i}
        className="w-4 h-4 rounded-full bg-orange-500 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading state for spinner
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      }).unwrap();

      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (err) {
      const error = err as { data?: { detail?: string }; message?: string };
      const errorMessage =
        error?.data?.detail || error?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12 bg-white">
        <div className="max-w-md w-full shadow-lg rounded-lg p-6 font-sans">
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded focus:outline-orange-500"
              required
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-orange-500"
              required
              disabled={loading}
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded focus:outline-orange-500"
              required
              disabled={loading}
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full p-2 border rounded focus:outline-orange-500"
              required
              disabled={loading}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded focus:outline-orange-500"
                required
                disabled={loading}
              />
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded focus:outline-orange-500"
                required
                disabled={loading}
              />
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full p-2 rounded text-white ${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } flex justify-center items-center`}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Register"}
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              Login here
            </a>
          </p>
          <p className="text-xs mt-2 text-center text-gray-600">
            By registering, you agree to our{" "}
            <a href="/terms" className="text-orange-500 hover:underline">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>

      {/* Right side: Image and text */}
      <div className="w-full md:w-1/2 bg-orange-50 flex flex-col justify-center items-center p-12 text-center">
        <img
          src="/your-image-path.svg" // Replace with your image path
          alt="Our services"
          className="max-w-sm mb-8"
        />
        <h2 className="text-3xl font-bold text-orange-600 mb-4">
          Discover Our Amazing Services!
        </h2>
        <p className="text-gray-700 max-w-md">
          Join thousands of happy customers who trust us for quality and
          excellent support. Sign up now to get started and enjoy exclusive
          benefits tailored just for you.
        </p>
      </div>
    </div>
  );
};

export default Register;
