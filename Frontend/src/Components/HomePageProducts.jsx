import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { get } from "../../Services/ApiEndPoint";

export default function HomePageProducts() {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedFilter, setSelectedFilter] = useState("All");

	const filterOptions = ["BedSide Table", "Chair"];

	// Define colSpan and rowSpan patterns
	const colSpanPattern = [1, 1, 1, 2, 1, 1, 2];
	const rowSpanPattern = [2, 2, 2, 2, 2, 2, 2];

	// Fetch products from API
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
				setFilteredProducts(applyGridPatterns(preparedProducts.slice(0, 7))); // Limit to 7 products initially
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

		if (filter === "All") {
			setFilteredProducts(applyGridPatterns(products.slice(0, 7))); // Limit to 7 products
		} else {
			const filtered = products.filter((product) =>
				product.category.toLowerCase().includes(filter.toLowerCase())
			);
			setFilteredProducts(applyGridPatterns(filtered.slice(0, 7))); // Limit to 7 filtered products
		}
	};

	return (
		<div className="flex flex-col w-full items-center">
			{/* Filter Buttons */}
			<div className="flex justify-end gap-3 w-full mb-4 pr-5">
				<Link to="/product-list">
					<motion.button
						className="px-4 py-2 text-xl tracking-wider font-bold rounded-lg shadow-md"
						initial={{ backgroundColor: "#EBE2DB", color: "#523B2F" }}
						whileHover={{ backgroundColor: "#523B2F", color: "#EBE2DB" }}
						transition={{ duration: 0.5 }}
					>
						All
					</motion.button>
				</Link>
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
			<ProductCard products={filteredProducts} />
		</div>
	);
}
