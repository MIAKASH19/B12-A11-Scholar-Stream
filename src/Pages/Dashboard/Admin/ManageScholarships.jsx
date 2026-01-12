import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const { register, handleSubmit, reset } = useForm();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["all-scholarships", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships?limit=${limit}&skip=${currentPage * limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const scholarships = data.result || [];
  const totalScholarships = data.total || 0;
  const totalPages = Math.ceil(totalScholarships / limit);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this scholarship?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.delete(`/scholarships/${id}`);
    queryClient.invalidateQueries(["all-scholarships"]);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Scholarship has been removed.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleUpdateScholarship = async (data) => {
    try {
      const payload = {
        ...data,
        tuitionFees: Number(data.tuitionFees),
        applicationFees: Number(data.applicationFees),
        serviceCharge: Number(data.serviceCharge),
        universityWorldRank: Number(data.universityWorldRank),
      };

      await axiosSecure.patch(
        `/scholarships/${selectedScholarship._id}`,
        payload
      );

      queryClient.invalidateQueries(["all-scholarships"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Scholarship updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      document.getElementById("edit_scholarship_modal").close();
      setSelectedScholarship(null);
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (isLoading)
  return (
    <div className="w-full flex items-center justify-center h-screen pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );


  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#0b0f19] text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Scholarships ({totalScholarships})
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-[#111827] rounded-2xl shadow border border-gray-200 dark:border-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-[#15181f] text-gray-700 dark:text-gray-300">
            <tr>
              <th>#</th>
              <th>Scholarship</th>
              <th>University</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Deadline</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-[#1f2937] transition"
              >
                <td>{currentPage * limit + index + 1}</td>

                <td>
                  <p className="font-medium">{item.scholarshipName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.subjectCategory}
                  </p>
                </td>

                <td>
                  <p>{item.universityName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.universityCountry}
                  </p>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {item.scholarshipCategory}
                  </span>
                </td>

                <td>{item.degree}</td>
                <td>{item.applicationDeadline}</td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="btn btn-sm btn-ghost tooltip tooltip-top"
                      data-tip="Edit"
                      onClick={() => {
                        setSelectedScholarship(item);
                        reset(item);
                        document
                          .getElementById("edit_scholarship_modal")
                          .showModal();
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10 tooltip tooltip-top"
                      data-tip="Delete"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {scholarships.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-16 text-gray-500 dark:text-gray-400"
                >
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-2 flex-wrap">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn btn-outline"
          >
            Prev
          </button>
        )}

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn ${
              currentPage === page ? "btn-info text-white" : "btn-outline"
            }`}
          >
            {page + 1}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn btn-outline"
          >
            Next
          </button>
        )}
      </div>

      {/* Edit Modal */}
      <dialog id="edit_scholarship_modal" className="modal">
        <div className="modal-box max-w-2xl bg-white dark:bg-[#111827] text-gray-800 dark:text-gray-200">
          <h3 className="font-semibold text-xl mb-4">
            Update Scholarship
          </h3>

          <form
            onSubmit={handleSubmit(handleUpdateScholarship)}
            className="space-y-4"
          >
            {[
              ["Scholarship Name", "scholarshipName"],
              ["University Name", "universityName"],
              ["University Image URL", "universityImage"],
              ["Subject Category", "subjectCategory"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="label">{label}</label>
                <input
                  {...register(name)}
                  className="input input-bordered w-full dark:bg-[#1f2937]"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("universityCountry")}
                placeholder="Country"
                className="input input-bordered dark:bg-[#1f2937]"
              />
              <input
                {...register("universityCity")}
                placeholder="City"
                className="input input-bordered dark:bg-[#1f2937]"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  document.getElementById("edit_scholarship_modal").close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-info">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;
