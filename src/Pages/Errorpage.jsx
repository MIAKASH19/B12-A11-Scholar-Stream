import React from "react";
import { Link } from "react-router";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-50 scale-150"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-red-50">
            <AlertCircle size={80} className="text-red-500 animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
