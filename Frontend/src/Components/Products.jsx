import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { get } from "../../Services/ApiEndPoint";

export default function Products() {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedFilter, setSelectedFilter] = useState("All");

	const filterOptions = ["All", "BedSide Table", "Chair"];
	const itemsPerPage = 7; // Number of items per page

	const colSpanPattern = [1, 1, 1, 2, 1, 1, 2];
	const rowSpanPattern = [2, 2, 2, 2, 2, 2, 2];

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const request = await get("/api/v1/products/");
				const data = request.data;

				// Transform products to match desired format
				const preparedProducts = data.map((product) => ({
					image: product.images[0]?.url || "", // Use the first image as the main image
					name: product.name,
					price: `$${product.price}`,
					category: product.category,
					_id: product._id,
				}));

				setProducts(preparedProducts);
				setFilteredProducts(applyGridPatterns(preparedProducts)); // Apply grid patterns here
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	// Reapply grid patterns after filtering
	const applyGridPatterns = (items) => {
		return items.map((product, index) => ({
			...product,
			colSpan: colSpanPattern[index % colSpanPattern.length],
			rowSpan: rowSpanPattern[index % rowSpanPattern.length],
		}));
	};

	// Handle filter change
	const handleFilterChange = (filter) => {
		setSelectedFilter(filter);
		setCurrentPage(1); // Reset to the first page

		if (filter === "All") {
			setFilteredProducts(applyGridPatterns(products));
		} else {
			const filtered = products.filter((product) =>
				product.category.toLowerCase().includes(filter.toLowerCase())
			);
			setFilteredProducts(applyGridPatterns(filtered));
		}
	};

	// Calculate visible products for pagination
	const visibleProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	return (
		<div className="flex flex-col w-full items-center">
			{/* Filter Buttons */}
			<div className="flex justify-end gap-3 w-full mb-4 pr-5">
				{filterOptions.map((item) => (
					<motion.button
						key={item}
						onClick={() => handleFilterChange(item)}
						className={`px-4 py-2 text-xl tracking-wider font-bold rounded-lg shadow-md ${
							selectedFilter === item
								? "bg-secondary-100 text-white"
								: "bg-secondary-200 text-secondary-100"
						}`}
						initial={{ backgroundColor: "#EBE2DB", color: "#523B2F" }}
						whileHover={{ backgroundColor: "#523B2F", color: "#EBE2DB" }}
						transition={{ duration: 0.5 }}
					>
						{item}
					</motion.button>
				))}
			</div>

			{/* Product Cards */}
			<ProductCard products={visibleProducts} />

			{/* Pagination Controls */}
			<div className="w-full pr-4 flex justify-end mt-4 gap-2">
				<button
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg shadow-md"
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i}
						onClick={() => setCurrentPage(i + 1)}
						className={`px-4 py-2 rounded-lg shadow-md ${
							currentPage === i + 1
								? "bg-secondary-100 text-white"
								: "bg-secondary-200 text-secondary-100"
						}`}
					>
						{i + 1}
					</button>
				))}
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg shadow-md"
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}
