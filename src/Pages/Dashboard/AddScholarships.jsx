import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addScholarship = async (data) => {
    try {
      const response = await axiosSecure.post("/scholarships", data);
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Scholarship
      </h1>

      <form
        onSubmit={handleSubmit(addScholarship)}
        className="bg-white shadow-xl border border-zinc-300 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Scholarship Name
          </label>
          <input
            type="text"
            {...register("scholarshipName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter scholarship name"
          />
          {errors.scholarshipName && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            University Name
          </label>
          <input
            type="text"
            {...register("universityName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter university name"
          />
          {errors.universityName && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            University Image URL
          </label>
          <input
            type="url"
            {...register("universityImage", { required: true })}
            className="input input-bordered w-full"
            placeholder="Paste image URL"
          />
          {errors.universityImage && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Country
          </label>
          <input
            type="text"
            {...register("universityCountry", { required: true })}
            className="input input-bordered w-full"
            placeholder="Country"
          />
          {errors.universityCountry && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">City</label>
          <input
            type="text"
            {...register("universityCity", { required: true })}
            className="input input-bordered w-full"
            placeholder="City"
          />
          {errors.universityCity && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            World Rank
          </label>
          <input
            type="number"
            {...register("universityWorldRank", { required: true })}
            className="input input-bordered w-full"
            placeholder="University world rank"
          />
          {errors.universityWorldRank && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Subject Category
          </label>
          <input
            type="text"
            {...register("subjectCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="Subject Category"
          />
          {errors.subjectCategory && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Scholarship Category
          </label>
          <select
            {...register("scholarshipCategory", { required: true })}
            className="input input-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="Full Fund">Full Fund</option>
            <option value="Partial Fund">Partial Fund</option>
            <option value="Merit Based">Merit Based</option>
          </select>
          {errors.scholarshipCategory && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Degree</label>
          <input
            type="text"
            {...register("degree", { required: true })}
            className="input input-bordered w-full"
            placeholder="Degree (e.g., Masters, Bachelors)"
          />
          {errors.degree && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Tuition Fees
          </label>
          <input
            type="number"
            {...register("tuitionFees", { required: true })}
            className="input input-bordered w-full"
            placeholder="Tuition Fees"
          />
          {errors.tuitionFees && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Application Fees
          </label>
          <input
            type="number"
            {...register("applicationFees", { required: true })}
            className="input input-bordered w-full"
            placeholder="Application Fees"
          />
          {errors.applicationFees && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Service Charge
          </label>
          <input
            type="number"
            {...register("serviceCharge", { required: true })}
            className="input input-bordered w-full"
            placeholder="Service Charge"
          />
          {errors.serviceCharge && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Application Deadline
          </label>
          <input
            type="date"
            {...register("applicationDeadline", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.applicationDeadline && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl cursor-pointer transition-all"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
