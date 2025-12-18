import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn">
        <div className="flex justify-center mb-6">
          <XCircle className="text-red-500 w-20 h-20 animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mb-6">
          Your payment was not completed. You can try again or go back to your
          dashboard to manage your applications.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/my-applications"
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
