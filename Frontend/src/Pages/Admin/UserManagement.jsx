import React, { useEffect, useState } from "react";
import { delet, get, put } from "../../../Services/ApiEndPoint";
import toast from "react-hot-toast";
import SearchBar from "../../Components/SearchBar";

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editableUser, setEditableUser] = useState(null);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const request = await get("/api/admin/getuser");
				const response = request.data;

				if (request.status === 200) {
					setUsers(response.user);
					setFilteredUsers(response.user);
				}
			} catch (error) {
				console.log(error);
				if (error.response.status === 401) {
					toast.error("You are not authorized to access admin page");
				}
			}
		};
		getUsers();
	}, []);

	const handleEdit = (user) => {
		setEditableUser(user);
		setIsEditing(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditableUser({ ...editableUser, [name]: value });
	};

	const handleSave = async () => {
		try {
			const response = await put(
				`/api/admin/update/${editableUser._id}`,
				editableUser
			);
			if (response.status === 200) {
				toast.success("User  updated successfully!");
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
		setIsEditing(false);
	};

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this user?"
		);
		if (!confirmDelete) return;

		try {
			const request = await delet(`/api/admin/delete/${id}`);
			if (request.status === 200) {
				toast.success("User  deleted successfully");
				const updatedUsers = users.filter((user) => user._id !== id);
				setUsers(updatedUsers);
				setFilteredUsers(updatedUsers);
			} else {
				toast.error("Failed to delete user.");
			}
		} catch (error) {
			toast.error("An error occurred while deleting the user");
		}
	};

	const handleSearch = (query) => {
		const filtered = users.filter((user) =>
			user.name.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredUsers(filtered);
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-5 text-gray-700">User Management</h1>
			<div className="bg-white shadow-md rounded overflow-hidden mx-20">
				<SearchBar onSearch={handleSearch} />
				<table className="min-w-full border-collapse table-auto text-center">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="px-6 py-3 text-sm font-medium text-gray-600">#</th>
							<th className="px-6 py-3 text-sm font-medium text-gray-600">
								Name
							</th>
							<th className="px-6 py-3 text-sm font-medium text-gray-600">
								Email
							</th>
							<th className="px-6 py-3 text-sm font-medium text-gray-600">
								Role
							</th>
							<th className="px-6 py-3 text-sm font-medium text-gray-600">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user, index) => (
							<tr key={user._id} className="text-left">
								<td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
								<td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
								<td className="px-6 py-4 text-sm text-gray-700">
									{user.email}
								</td>
								<td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
								<td className="px-6 py-4 text-sm text-gray-700">
									<button
										onClick={() => handleEdit(user)}
										className="text-blue-500"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(user._id)}
										className="text-red-500 ml-2"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isEditing && (
				<div className="modal">
					<h2>Edit User</h2>
					<input
						type="text"
						name="name"
						value={editableUser.name}
						onChange={handleInputChange}
						placeholder="Name"
					/>
					<input
						type="email"
						name="email"
						value={editableUser.email}
						onChange={handleInputChange}
						placeholder="Email"
					/>
					<button onClick={handleSave}>Save</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</div>
			)}
		</>
	);
};

export default UserManagement;
