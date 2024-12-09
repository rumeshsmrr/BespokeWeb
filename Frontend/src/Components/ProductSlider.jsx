import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { get } from "../../Services/ApiEndPoint";

export default function ProductSlider({ category }) {
	const [recommendedProducts, setRecommendedProducts] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchRecommendedProducts = async () => {
			try {
				const request = await get(`/api/v1/products/Suggestion/${category}`);
				const data = request.data;

				setRecommendedProducts(data); // Ensure API returns "products" array
			} catch (error) {
				console.error("Error fetching recommended products:", error);
			}
		};

		fetchRecommendedProducts();
	}, [category]);

	// Group products into slides of 3 items
	const slides = [];
	for (let i = 0; i < recommendedProducts.length; i += 3) {
		slides.push(recommendedProducts.slice(i, i + 3));
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === slides.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? slides.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className="flex flex-col items-center w-full">
			<h2 className="text-4xl font-bold mb-8">You may also like</h2>
			<div className="relative w-full max-w-6xl">
				{/* Left Navigation Button */}
				<button
					onClick={handlePrev}
					className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
				>
					<FaChevronLeft className="text-gray-500" />
				</button>

				{/* Slider */}
				<div className="overflow-hidden">
					<div
						className="flex transition-transform duration-300"
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
						}}
					>
						{slides.map((slide, slideIndex) => (
							<div
								key={slideIndex}
								className="flex justify-center items-center w-full gap-4"
								style={{ flex: "0 0 100%" }}
							>
								{slide.map((product) => (
									<div
										key={product._id}
										className="flex flex-col items-center p-4 w-64"
									>
										<img
											src={
												product.images[0]?.url ||
												"https://via.placeholder.com/300"
											} // Fix: Access the first image URL properly
											alt={product.name}
											className="rounded-lg w-64 h-64 object-cover mb-4"
											draggable="false"
										/>
										<h3 className="text-lg font-semibold">{product.name}</h3>
										<p className="text-xl font-bold">${product.price}</p>
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				{/* Right Navigation Button */}
				<button
					onClick={handleNext}
					className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
				>
					<FaChevronRight className="text-gray-500" />
				</button>
			</div>
		</div>
	);
}

ProductSlider.propTypes = {
	category: PropTypes.string.isRequired,
};
