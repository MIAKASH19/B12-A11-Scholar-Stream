import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updatedUser = { displayName: name, photoURL };
      const res = await axiosSecure.put(`/users/${user.email}`, updatedUser);

      if (res.data.success) {
        alert("Profile updated successfully!");
        setUser({ ...user, ...updatedUser });
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Profile Image */}
        <div className="shrink-0">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt={name}
            className="w-32 h-32 rounded-full border-2 border-indigo-500 object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Role</label>
              <input
                type="text"
                value={user?.role || "Student"}
                disabled
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
