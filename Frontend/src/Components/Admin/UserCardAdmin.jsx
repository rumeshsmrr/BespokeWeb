import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { delet, put } from "../../../Services/ApiEndPoint";

export default function UserCardAdmin({ user }) {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({ ...user });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async () => {
		try {
			// Make an API call to update the user
			const response = await put(
				`/api/admin/update/${editableUser._id}`,
				editableUser
			);

			if (response.status === 200) {
				toast.success("User  updated successfully!");
				// Update the local state to reflect the changes
				const updatedUsers = users.map((user) =>
					user._id === editableUser._id ? editableUser : user
				);
				setUsers(updatedUsers);
				setFilteredUsers(updatedUsers);
			} else {
				toast.error("Failed to update user.");
			}
		} catch (error) {
			console.error("Error updating user:", error);
			toast.error("An error occurred while updating the user.");
		}
		setIsEditing(false); // Exit editing mode
	};
	const handleCancel = () => {
		setFormData({ ...user });
		setIsEditing(false);
	};

	const handleDelete = async (id) => {
		try {
			// Show confirmation toast
			toast(
				(t) => (
					<div>
						<p>Are you sure you want to delete this user?</p>
						<div className="flex justify-end gap-2 mt-5">
							<button
								className="px-4 py-0 text-white bg-red-500 h-8 rounded-[20px] transition-all duration-200 hover:bg-red-600"
								onClick={async () => {
									toast.dismiss(t.id); // Close the toast
									await confirmDelete(id); // Call delete function
								}}
							>
								Delete
							</button>
							<button
								className="px-4 py-0 bg-gray-200 hover:bg-gray-300 transition-all duration-200 h-8 rounded-[20px]"
								onClick={() => toast.dismiss(t.id)} // Close the toast
							>
								Cancel
							</button>
						</div>
					</div>
				),
				{ duration: 10000 } // Extend duration for user interaction
			);
		} catch (error) {
			toast.error("An error occurred while deleting the user");
		}
	};

	const confirmDelete = async () => {
		try {
			const request = await delet(`/api/admin/delete/${user._id}`);
			if (request.status === 200) {
				toast.success("User  deleted successfully");
				// Remove the deleted user from the local state
				const updatedUsers = users.filter((user) => user._id !== userId);
				setUsers(updatedUsers);
				setFilteredUsers(updatedUsers);
			}
		} catch (error) {
			if (error.response?.status === 403) {
				toast.error("Cannot delete admin user");
			} else {
				toast.error("An error occurred while deleting the user");
			}
		}
	};

	return (
		<div
			className={`transition-all duration-500 ease-in-out bg-white rounded-2xl border-2 border-secondary-100 shadow-md overflow-hidden ${
				isEditing ? "p-8" : "p-4 flex justify-between items-center"
			}`}
			style={{ width: isEditing ? "100%" : "auto" }}
		>
			{!isEditing ? (
				<>
					{/* User View */}
					<div className="flex items-center gap-4">
						<div>
							<h3 className="text-xl font-semibold">{user.name}</h3>
							<p className="text-lg">{user.email}</p>
							<p className="text-lg">{user.mobile}</p>
							<p className="text-lg">{user.address}</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<button
							onClick={() => setIsEditing(true)}
							className="bg-secondary-100 text-white p-2 rounded-full hover:bg-secondary-200"
						>
							<FaPen />
						</button>
						<button
							type="button"
							onClick={handleDelete}
							className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
						>
							<FaTrash />
						</button>
					</div>
				</>
			) : (
				<>
					{/* Edit Form */}
					<form className="w-full">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold">Edit User</h2>
							<button
								onClick={handleCancel}
								className="text-red-600 hover:text-red-800"
							>
								Cancel
							</button>
						</div>
						<div className="mt-4">
							<label className="block text-secondary-100 mb-2">Name</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="border-2 border-secondary-100 rounded-lg p-2 w-full"
							/>
						</div>
						<div className="mt-4">
							<label className="block text-secondary-100 mb-2">Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className="border-2 border-secondary-100 rounded-lg p-2 w-full"
							/>
						</div>
						<div className="mt-4">
							<label className="block text-secondary-100 mb-2">
								Phone Number
							</label>
							<input
								type="text"
								name="mobile"
								value={formData.mobile}
								onChange={handleInputChange}
								className="border-2 border-secondary-100 rounded-lg p-2 w-full"
							/>
						</div>
						<div className="mt-4">
							<label className="block text-secondary-100 mb-2">Address</label>
							<input
								type="text"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								className="border-2 border-secondary-100 rounded-lg p-2 w-full"
							/>
						</div>
						<div className="flex justify-end mt-6 gap-4">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSave}
								className="px-4 py-2 bg-secondary-100 text-white rounded-lg"
							>
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
}

UserCardAdmin.propTypes = {
	user: PropTypes.object.isRequired,
};
