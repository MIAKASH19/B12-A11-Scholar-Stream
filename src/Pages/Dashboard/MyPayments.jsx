import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const MyPayments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
  return (
    <div className="w-full flex items-center justify-center h-screen pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );


  return (
    <div className="p-6 bg-white dark:bg-[#0b0f19] text-zinc-900 dark:text-zinc-300 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        My Payments ({payments.length})
      </h1>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          No payment records found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="table  w-full border dark:border-zinc-700 border-zinc-300">
            <thead className="bg-gray-100 dark:bg-[#15181f] text-zinc-700 dark:text-zinc-300">
              <tr>
                <th>Sl</th>
                <th>Scholarship</th>
                <th>University</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Tracking ID</th>
                <th>Transaction ID</th>
                <th>Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className="border border-zinc-700 dark:border-zinc-600"
                >
                  <td>{idx + 1}</td>

                  <td className="font-medium text-xs">{payment.scholarshipName || "N/A"}</td>

                  <td className="text-xs">{payment.universityName || "N/A"}</td>

                  <td className="font-semibold text-xs">${payment.amount}</td>

                  <td>
                    {payment.paymentStatus === "paid" ? (
                      <span className="flex items-center gap-2 text-green-600 font-semibold">
                        <FaCheckCircle /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-yellow-500 font-semibold">
                        <FaClock /> Pending
                      </span>
                    )}
                  </td>

                  <td className="text-xs font-mono">{payment.trackingId || "—"}</td>

                  <td className="text-xs font-mono">{payment.transactionId || "—"}</td>

                  <td className="text-xs">{new Date(payment.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPayments;
