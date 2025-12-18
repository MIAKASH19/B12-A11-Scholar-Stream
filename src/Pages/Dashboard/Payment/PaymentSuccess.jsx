import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setPaymentInfo(res.data.payment);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading payment details...</p>
      </div>
    );
  }

  if (!paymentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Payment information not found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-24 h-24 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500 mb-6">
          Your scholarship application has been successfully submitted.
        </p>
        <div className="bg-gray-100 p-6 rounded-xl mb-6 text-left space-y-3">
          <Detail label="Scholarship" value={paymentInfo.scholarshipName} />
          <Detail label="University" value={paymentInfo.universityName} />
          <Detail label="Amount Paid" value={`$${paymentInfo.amount}`} />
          <Detail label="Tracking ID" value={paymentInfo.trackingId} />
          <Detail label="Transaction ID" value={paymentInfo.transactionId} />
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/my-applications"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-green-600 transition"
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

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

export default PaymentSuccess;
