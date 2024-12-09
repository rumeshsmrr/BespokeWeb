import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPen, FaTrash } from "react-icons/fa";
import { delet, put } from "../../../Services/ApiEndPoint";
import toast from "react-hot-toast";

const ProductCardAdmin = ({ product, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({ ...product });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async () => {
		try {
			const response = await put(`api/v1/products/${product._id}`, formData);
			const data = await response.data;
			toast.success(data.message || "Product updated successfully.");
			setIsEditing(false); // Exit editing mode
		} catch (error) {
			console.error("Error updating product:", error);
			toast.error("An error occurred while updating the product.");
		}
	};

	const handleCancel = () => {
		setFormData({ ...product });
		setIsEditing(false);
	};

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete "${product.name}"?`
		);
		if (!confirmDelete) return;

		try {
			const response = await delet(`/${product._id}`);
			const data = await response.json();
			if (response.ok) {
				toast.success(data.message || "Product deleted successfully.");
				onDelete(product._id); // Notify parent component
			} else {
				toast.error(data.message || "Failed to delete product.");
			}
		} catch (error) {
			console.error("Error deleting product:", error);
			toast.error("An error occurred while deleting the product.");
		}
	};

	return (
		<div
			className={`transition-all duration-500 ease-in-out bg-white rounded-xl border shadow-lg hover:shadow-2xl overflow-hidden ${
				isEditing ? "p-8" : "p-4 flex justify-between items-center"
			}`}
		>
			{!isEditing ? (
				<>
					{/* Product View */}
					<div className="flex items-center gap-4">
						<img
							src={product.images[0]?.url}
							alt={product.name}
							className="w-20 h-20 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-110"
						/>
						<div>
							<h3 className="text-lg font-semibold text-gray-800">
								{product.name}
							</h3>
							<p
								className={`${
									product.stoke > 0 ? "text-green-500" : "text-red-500"
								} text-sm`}
							>
								{product.stoke > 0 ? "In Stock" : "Out of Stock"}
							</p>
						</div>
					</div>
					<p className="text-lg font-bold text-gray-700">${product.price}</p>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setIsEditing(true)}
							className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
						>
							<FaPen />
						</button>
						<button
							onClick={handleDelete}
							className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300"
						>
							<FaTrash />
						</button>
					</div>
				</>
			) : (
				<>
					{/* Edit Form */}
					<form className="w-full space-y-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								Edit Product
							</h2>
							<button
								type="button"
								onClick={handleCancel}
								className="text-red-500 hover:text-red-700 transition duration-300"
							>
								Cancel
							</button>
						</div>
						<div>
							<label className="block text-gray-600 mb-1">Product Name</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
							/>
						</div>
						<div>
							<label className="block text-gray-600 mb-1">Product Images</label>
							<div className="flex gap-4">
								{formData.images.map((img, index) => (
									<img
										key={index}
										src={img.url}
										alt={`Product ${index}`}
										className="w-16 h-16 object-cover rounded-lg shadow-md"
									/>
								))}
							</div>
						</div>
						<div>
							<label className="block text-gray-600 mb-1">
								Product Description
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows={4}
								className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
							></textarea>
						</div>
						<div>
							<label className="block text-gray-600 mb-1">Product Stock</label>
							<input
								type="number"
								name="stoke"
								value={formData.stoke}
								onChange={handleInputChange}
								className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
							/>
						</div>
						<div>
							<label className="block text-gray-600 mb-1">Price</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleInputChange}
								className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
							/>
						</div>
						<div className="flex justify-end gap-4">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSave}
								className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
							>
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

ProductCardAdmin.propTypes = {
	product: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default ProductCardAdmin;
