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

  // delete scholarships
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

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Scholarship has been removed.",
      timer: 1500,
      showConfirmButton: false,
    });

    queryClient.invalidateQueries(["all-scholarships"]);
  };

  // update scholarships
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
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Scholarships ({totalScholarships})
      </h2>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="table">
          <thead className="bg-gray-100">
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
              <tr key={item._id}>
                <td>{currentPage * limit + index + 1}</td>

                <td>
                  <p className="font-medium">{item.scholarshipName}</p>
                  <p className="text-xs text-gray-500">
                    {item.subjectCategory}
                  </p>
                </td>

                <td>
                  <p>{item.universityName}</p>
                  <p className="text-xs text-gray-500">
                    {item.universityCountry}
                  </p>
                </td>

                <td>
                  <span className="badge">{item.scholarshipCategory}</span>
                </td>

                <td>{item.degree}</td>
                <td>{item.applicationDeadline}</td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="btn text-lg hover:btn-info tooltip tooltip-top"
                      onClick={() => {
                        setSelectedScholarship(item);
                        reset(item); // ⭐ prefill form
                        document
                          .getElementById("edit_scholarship_modal")
                          .showModal();
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn text-lg hover:btn-error tooltip tooltip-top"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {scholarships.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="mt-10 flex justify-center gap-2">
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage((p) => p - 1)} className="btn">
            Prev
          </button>
        )}

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn ${
              currentPage === page ? "btn-info text-white" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <button onClick={() => setCurrentPage((p) => p + 1)} className="btn">
            Next
          </button>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <dialog id="edit_scholarship_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-semibold text-xl mb-4">Update Scholarship</h3>

          <form
            onSubmit={handleSubmit(handleUpdateScholarship)}
            className="space-y-4"
          >
            {/* Scholarship Name */}
            <div>
              <label className="label">Scholarship Name</label>
              <input
                {...register("scholarshipName", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* University Name */}
            <div>
              <label className="label">University Name</label>
              <input
                {...register("universityName", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* University Image */}
            <div>
              <label className="label">University Image URL</label>
              <input
                {...register("universityImage")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Country & City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Country</label>
                <input
                  {...register("universityCountry")}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">City</label>
                <input
                  {...register("universityCity")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* World Rank */}
            <div>
              <label className="label">University World Rank</label>
              <input
                type="number"
                {...register("universityWorldRank")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Subject Category */}
            <div>
              <label className="label">Subject Category</label>
              <input
                {...register("subjectCategory")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Scholarship Category */}
            <div>
              <label className="label">Scholarship Category</label>
              <select
                {...register("scholarshipCategory")}
                className="select select-bordered w-full"
              >
                <option value="Full Fund">Full Fund</option>
                <option value="Partial Fund">Partial Fund</option>
                <option value="Self Fund">Self Fund</option>
              </select>
            </div>

            {/* Degree */}
            <div>
              <label className="label">Degree</label>
              <select
                {...register("degree")}
                className="select select-bordered w-full"
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {/* Fees */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Tuition Fees</label>
                <input
                  type="number"
                  {...register("tuitionFees")}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Application Fees</label>
                <input
                  type="number"
                  {...register("applicationFees")}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Service Charge</label>
                <input
                  type="number"
                  {...register("serviceCharge")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="label">Application Deadline</label>
              <input
                type="date"
                {...register("applicationDeadline", { required: true })}
                className="input input-bordered w-full"
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
                Update Scholarship
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;
