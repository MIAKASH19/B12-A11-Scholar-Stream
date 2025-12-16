import { useParams, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApplyScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`http://localhost:3000/scholarship-details/${id}`)
      .then((res) => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.name || !form.university || !form.category || !form.degree) {
      alert("Name missing in form field.");
      return;
    }

    const applicationData = {
      scholarshipId: scholarship._id,
      userId: user.uid,
      userName: form.name.value,
      userEmail: user.email,
      universityName: form.university.value,
      scholarshipCategory: form.category.value,
      degree: form.degree.value,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      applicationStatus: "pending",
      paymentStatus: "unpaid",
      applicationDate: new Date(),
    };

    console.log(applicationData);

    Swal.fire({
      title: "Are you sure to Apply?",
      text: "You won't be undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post(`http://localhost:3000/applications`, applicationData)
          .then((res) => {
            const data = res.data;

            if (data.success) {
              const applicationId = data.insertedId;
              if (applicationId) {
                // navigate(`/checkout/${applicationId}`);
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                  data.message ||
                  "You have already applied for this scholarship.",
              });
            }
          })
          .catch((err) => {
            console.error("Error submitting application:", err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to submit application. Please try again.",
            });
          });

        Swal.fire({
          title: "Applied!",
          text: "You successfully applied in this scholarship",
          icon: "success",
        });
      }
    });
  };

  if (loading || !scholarship) {
    return <p className="text-center mt-20">Loading scholarship...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Scholarship Application</h2>
        <p className="text-gray-600">
          Please review scholarship details before applying
        </p>

        <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
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
        className="bg-white shadow rounded-lg p-6 space-y-6"
      >
        {/* Scholarship Info */}
        <div>
          <h3 className="font-semibold mb-4">Scholarship Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="label text-sm text-zinc-800">
                Scholarship Name
              </label>
              <input
                type="text"
                value={scholarship.scholarshipName}
                readOnly
                className="input w-full rounded-full"
                placeholder="Scholarship Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label text-sm text-zinc-800">
                Scholarship Category
              </label>
              <input
                type="text"
                name="category"
                value={scholarship.scholarshipCategory}
                readOnly
                className="input w-full rounded-full"
                placeholder="Category"
              />
            </div>
          </div>
        </div>

        {/* Applicant Info */}
        <div>
          <h3 className="font-semibold mb-4">Applicant Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="label text-sm text-zinc-800">
                Applicant Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.displayName}
                className="input w-full rounded-full"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label text-sm text-zinc-800">
                Applicant Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input w-full rounded-full"
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div>
          <h3 className="font-semibold mb-4">Academic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="label text-sm text-zinc-800">
                University Name
              </label>
              <input
                type="text"
                name="university"
                value={scholarship.universityName}
                readOnly
                className="input w-full rounded-full"
                placeholder="University Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label text-sm text-zinc-800">Degree</label>
              <input
                type="text"
                name="degree"
                value={scholarship.degree}
                readOnly
                className="input w-full rounded-full"
                placeholder="Degree"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p className="flex justify-between text-sm">
            <span>Application Fee</span>
            <span>${scholarship.applicationFees}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span>Service Charge</span>
            <span>${scholarship.serviceCharge}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span>
              ${scholarship.applicationFees + scholarship.serviceCharge}
            </span>
          </p>
        </div>

        <button type="submit" className="btn btn-primary rounded-full w-full">
          Apply & Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default ApplyScholarship;
