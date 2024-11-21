import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import useUserData from "../../hooks/useUserData";

const UserCard = ({ user, setLatestData }) => {
  const token = localStorage.getItem("access-token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedRole, setUpdatedRole] = useState(user.role);
  const [updatedStatus, setUpdatedStatus] = useState(user.status);
  const userData = useUserData();
  const email = userData.email;
  // Function to remove user
  const handleRemoveUser = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/all-users/${user._id}`,
        {
          headers: {  'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User removed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setLatestData((prev) => !prev); // Refresh data
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to remove user",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: true,
      });
      console.error("Error removing user:", error);
    }
  };

  // Function to edit user
  const handleEditUser = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/all-users/${user._id}`,
        { role: updatedRole, status: updatedStatus },
        {
          headers: {  'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false); // Close the modal
        setLatestData((prev) => !prev); // Refresh data
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update user",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div className="card shadow-md w-96">
        <div className="card-body">
          <h2 className="card-title">Email: {user.email}</h2>
          <p className="font-semibold">Role: {user.role}</p>
          {user.status === "pending" ? (
            <p className="font-semibold">
              Status: <span className="text-red-500">{user.status}</span>
            </p>
          ) : (
            <p className="font-semibold">
              Status: <span className="text-green-500">{user.status}</span>
            </p>
          )}
          <div className="card-actions justify-end">
            {user.email !== email ? (
              <>
                <button
                  className="btn bg-purple-400 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Info
                </button>
                <button
                  className="btn text-red-400 border border-red-400 bg-transparent hover:bg-red-400 hover:text-white"
                  onClick={handleRemoveUser}
                >
                  Remove User
                </button>
              </>
            ) : (
              // Placeholder for buttons when hidden
              <div className="h-10"></div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h3 className="text-lg font-bold mb-4">Update User</h3>

            {/* Role Select Field */}
            <label className="block mb-2 font-bold">Role</label>
            <select
              className="select select-bordered w-full mb-4"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>

            {/* Status Select Field */}
            <label className="block mb-2 font-bold">Status</label>
            <select
              className="select select-bordered w-full mb-4"
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>

            {/* Modal Action Buttons */}
            <div className="flex justify-end">
              <button
                className="btn bg-red-600 text-white mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-green-600 text-white"
                onClick={handleEditUser}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
