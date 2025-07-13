import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  code?: string | number;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const navigate = useNavigate();

  const code = props.code ?? "Under Construction";
  const message =
    props.message ??
    "🚧 We're busy building something awesome for you! Thanks for your patience — check back soon.";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8 text-center">
      <div className="max-w-md bg-white rounded-xl shadow-xl p-10">
        <div
          className="text-9xl mb-6 select-none text-orange-500"
          role="img"
          aria-label="construction emojis"
        >
          🚧👷‍♂️🏗️
        </div>
        <h1 className="text-6xl font-extrabold mb-4 text-orange-700">{code}</h1>
        <p className="text-xl font-semibold mb-8 text-gray-900">{message}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-700 transition"
          aria-label="Go back to homepage"
        >
          Take Me Home 🏠
        </button>
      </div>
      <p className="mt-10 max-w-xs text-gray-700 italic font-medium">
        Great things take time — thanks for sticking with us!
      </p>
    </div>
  );
};

export default ErrorPage;
