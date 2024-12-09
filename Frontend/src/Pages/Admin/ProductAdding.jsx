import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import SearchBar from "../../Components/SearchBar";
import ProductCardAdmin from "../../Components/Admin/ProductCardAdmin";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export default function ProductAdding() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredProducts = products.filter((prod) =>
		prod.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/v1/products/");
				const data = await response.json();
				setProducts(data); // Set fetched products
				setFilteredProducts(data); // Initially show all products
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	// Handle search
	const handleSearch = (query) => {
		const filtered = products.filter((product) =>
			product.name.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredProducts(filtered);
	};

	return (
		<div className="p-4">
			<div className="flex justify-between mb-4">
				<div className="flex items-center bg-gray-100 rounded-[10px] shadow-lg p-4 mb-6 w-full mr-10 h-12">
					<FaSearch className="text-gray-500 mr-4" />
					<input
						type="text"
						placeholder="Search products..."
						className="flex-grow outline-none bg-transparent text-gray-700"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<button className="flex items-center gap-2 px-6 py-3 h-12 rounded-lg bg-secondary-100 text-primary font-semibold shadow-md hover:shadow-lg hover:bg-secondary-200 transition-all duration-300 whitespace-nowrap group">
					<FaCirclePlus className="text-primary text-xl transition-transform duration-300 transform group-hover:scale-125 group-hover:text-secondary-100" />
					<span className="text-primary-light text-lg transition-colors duration-300 group-hover:text-secondary-100">
						Add Product
					</span>
				</button>
			</div>
			<div className="grid grid-cols-1 gap-4">
				{filteredProducts.map((product) => (
					<ProductCardAdmin key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
