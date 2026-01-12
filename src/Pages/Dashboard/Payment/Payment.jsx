import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { CreditCard, ShieldCheck } from "lucide-react";

const Payment = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: application = {}, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${id}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      totalCost: application.totalCost,
      scholarshipId: application._id,
      applicationId: application._id,
      userEmail: user.email,
      scholarshipName: application.scholarshipName,
      universityName: application.universityName,
    };

    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    window.location.href = res.data.url;
  };

  if (isLoading)
  return (
    <div className="w-full flex items-center justify-center h-screen pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );


  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-50 dark:bg-[#0b0f19] px-4 py-10">
      <div className="bg-white dark:bg-[#12151f] shadow-2xl rounded-xl max-w-lg w-full p-8 mt-10 border border-gray-200 dark:border-zinc-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Complete Your Payment
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6">
          Secure payment for your scholarship application
        </p>

        <div className="bg-gray-100 dark:bg-[#0c101a] rounded-2xl p-5 space-y-3 mb-6">
          <InfoRow label="Scholarship" value={application.scholarshipName} />
          <InfoRow label="University" value={application.universityName} />
          <InfoRow label="Applicant Email" value={user.email} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Total Amount
          </span>
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ${application.totalCost}
          </span>
        </div>

        <button
          onClick={handlePayment}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition active:scale-[0.98]"
        >
          <CreditCard size={20} />
          Pay Securely
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-300 mt-4">
          <ShieldCheck size={16} className="text-green-500" />
          100% Secure payment
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600 dark:text-gray-300">{label}</span>
    <span className="font-medium text-gray-800 dark:text-gray-100 text-right">
      {value}
    </span>
  </div>
);

export default Payment;
