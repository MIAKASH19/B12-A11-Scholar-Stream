import { useParams, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApplyScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/scholarship-details/${id}`)
      .then((res) => setScholarship(res.data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load scholarship details. Please try again later.",
        });
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.name || !form.university || !form.category || !form.degree) {
      Swal.fire({
        icon: "error",
        title: "Name missing in form field.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const applicationData = {
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      userId: user.uid,
      userName: form.name.value,
      userEmail: user.email,
      universityName: form.university.value,
      universityAddress: scholarship.universityCountry,
      subjectCategory: form.category.value,
      degree: form.degree.value,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      applicationStatus: "pending",
      paymentStatus: "unpaid",
      applicationDate: new Date(),
      totalCost: scholarship.applicationFees + scholarship.serviceCharge,
      feedback: "",
    };

    Swal.fire({
      title: "Are you sure to Apply?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post(`/applications`, applicationData)
          .then((res) => {
            const data = res.data;
            if (data.success) {
              navigate(`/dashboard/my-applications`);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message || "You have already applied for this scholarship.",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to submit application. Please try again.",
            });
          });

        Swal.fire({
          title: "Applied!",
          text: "You successfully applied for this scholarship",
          icon: "success",
        });
      }
    });
  };

  if (loading)
  return (
    <div className="w-full flex items-center justify-center h-[20vh] pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );

  return (
    <div className="bg-zinc-100 dark:bg-[#0b0f19]">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white dark:bg-[#0e1424] shadow rounded-lg p-6 mb-8 transition-colors">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Scholarship Application
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please review scholarship details before applying
          </p>

          <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-200">
            <p>
              <span className="font-medium">Application Fee:</span> $
              {scholarship.applicationFees}
            </p>
            <p>
              <span className="font-medium">Service Charge:</span> $
              {scholarship.serviceCharge}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#0e1424] shadow rounded-lg p-6 space-y-6 transition-colors"
        >
          {/* Scholarship Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Scholarship Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="label text-sm text-gray-800 dark:text-gray-300">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  value={scholarship.scholarshipName}
                  readOnly
                  className="input w-full rounded-full dark:bg-[#0e1424] dark:text-white dark:border-zinc-700"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="label text-sm text-gray-800 dark:text-gray-300">
                  Subject Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={scholarship.subjectCategory}
                  readOnly
                  className="input w-full rounded-full dark:bg-[#0e1424] dark:text-white dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* Applicant Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Applicant Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="label text-sm text-gray-800 dark:text-gray-300">
                  Applicant Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  className="input w-full rounded-full dark:bg-[#0e1424] dark:text-white dark:border-zinc-700"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label text-sm text-gray-800 dark:text-gray-300">
                  Applicant Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input w-full rounded-full dark:bg-[#0e1424] dark:text-gray-300 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Academic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="label text-sm text-gray-800 dark:text-gray-300">
                  University Name
                </label>
                <input
                  type="text"
                  name="university"
                  value={scholarship.universityName}
                  readOnly
                  className="input w-full rounded-full dark:bg-[#0e1424] dark:text-white dark:border-zinc-700"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="label text-sm text-gray-800 dark:text-gray-300">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={scholarship.degree}
                  readOnly
                  className="input w-full rounded-full dark:bg-[#0e1424] dark:text-white dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#0e1424] p-4 rounded transition-colors">
            <p className="flex justify-between text-sm text-gray-800 dark:text-gray-200">
              <span>Application Fee</span>
              <span>${scholarship.applicationFees}</span>
            </p>
            <p className="flex justify-between text-sm text-gray-800 dark:text-gray-200">
              <span>Service Charge</span>
              <span>${scholarship.serviceCharge}</span>
            </p>
            <hr className="my-2 border-gray-300 dark:border-zinc-700" />
            <p className="flex justify-between font-semibold text-sm text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${scholarship.applicationFees + scholarship.serviceCharge}</span>
            </p>
          </div>

          <button
            type="submit"
            className="btn bg-blue-600 text-white  border-none rounded-full w-full hover:bg-blue-700 transition-colors"
          >
            Apply & Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyScholarship;
