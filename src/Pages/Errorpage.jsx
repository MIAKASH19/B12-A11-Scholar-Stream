import React from "react";
import { Link } from "react-router";
import { AlertCircle, Home } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-20 transition-colors">
      <div className="max-w-md w-full text-center">
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-red-100 dark:bg-red-800 rounded-full blur-3xl opacity-50 scale-150"></div>
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-red-50 dark:border-red-700 transition-colors">
            <AlertCircle size={80} className="text-red-500 animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-gray-900 dark:text-gray-100 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-indigo-700"
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
