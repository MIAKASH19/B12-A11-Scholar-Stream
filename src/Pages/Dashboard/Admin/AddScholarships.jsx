import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addScholarship = async (data) => {
    try {
      const postData = {
        ...data,
        scholarshipPostDate: new Date().toISOString(),
        postedUserEmail: user?.email || "unknown",
      };
      const response = await axiosSecure.post("/scholarships", postData);
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Scholarship Added",
          text: `${data.scholarshipName} has been added successfully!`,
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not add scholarship. Try again.",
      });
    }
  };

  return (
    <div className="w-full dark:bg-[#0b0f19] bg-white mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Add New Scholarship
      </h1>

      <form
        onSubmit={handleSubmit(addScholarship)}
        className="bg-white dark:bg-[#111622] max-w-6xl mx-auto shadow-xl border border-zinc-300 dark:border-zinc-700 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { label: "Scholarship Name", name: "scholarshipName", type: "text" },
          { label: "University Name", name: "universityName", type: "text" },
          { label: "University Image URL", name: "universityImage", type: "url" },
          { label: "Country", name: "universityCountry", type: "text" },
          { label: "City", name: "universityCity", type: "text" },
          { label: "World Rank", name: "universityWorldRank", type: "number" },
          { label: "Subject Category", name: "subjectCategory", type: "text" },
          { label: "Degree", name: "degree", type: "text" },
          { label: "Tuition Fees", name: "tuitionFees", type: "number" },
          { label: "Application Fees", name: "applicationFees", type: "number" },
          { label: "Service Charge", name: "serviceCharge", type: "number" },
          { label: "Application Deadline", name: "applicationDeadline", type: "date" },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block mb-2 text-gray-600 dark:text-gray-300 font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              {...register(field.name, { required: true })}
              className="input input-bordered w-full dark:bg-[#1a1e2a] dark:text-gray-100 dark:border-zinc-700"
              placeholder={field.label}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>
        ))}

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl cursor-pointer transition-all"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
