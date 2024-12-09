import PropTypes from "prop-types";

import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { post } from "../../Services/ApiEndPoint";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

export default function ProductCard({ products }) {
	const user = useSelector((state) => state.Auth.user);

	const userId = user ? user._id : null;
	const handleAddToCart = async (product) => {
		try {
			const requestBody = {
				userId, // Hardcoded userId
				productId: product._id,
				quantity: 1, // Default quantity
			};

			const request = await post("/api/v1/cart/add", requestBody);
			const response = request.data;
			if (request.status === 200) {
				toast.success(response.message || "Product added to cart successfully");
			} else {
				toast.error(response.message || "Failed to add product to cart");
			}
		} catch (error) {
			if (error.request.status === 405) {
				toast.error("Product out of stock");
			} else {
				toast.error(error.response.message || "Failed to add product to cart");
			}
		}
	};

	return (
		<div
			className="w-full grid gap-8  p-4"
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gridAutoRows: "150px",
			}}
		>
			{products.map((product, index) => (
				<div
					key={index}
					className="relative  rounded-lg overflow-hidden bg-secondary-100"
					style={{
						gridColumn: `span ${product.colSpan}`,
						gridRow: `span ${product.rowSpan}`,
					}}
				>
					{/* Product Image */}
					<Link to={`/product-description/${product._id}`}>
						<img
							src={product.image}
							alt={product.name}
							className="w-full h-full object-cover cursor-pointer transition duration-300 ease-in-out hover:opacity-50"
							draggable="false"
						/>
					</Link>

					{/* Overlay for Price and Icon */}
					<div className="absolute bottom-0 left-0 right-0 h-fit   bg-secondary-100-low px-4 py-2 flex justify-between items-center">
						{/* Price */}
						<p className="text-white w-4/5  font-semibold text-lg lg:text-xl tracking-widest">
							{product.name}
						</p>

						{/* Icon */}
						<div className="bg-white p-2 w-16 h-16 rounded-tl-2xl absolute right-0 bottom-0 shadow-lg cursor-pointer flex justify-center items-center">
							<div
								className="bg-secondary-100 w-10 h-10 absolute rounded-md flex items-center justify-center"
								onClick={() => handleAddToCart(product)}
							>
								<FaPlusCircle className="text-white text-xl m-auto " />
							</div>
							<div className="absolute -top-6 right-0">
								<div id="curved-corner-bottomright"></div>
							</div>
							<div className="absolute bottom-0 -left-6">
								<div id="curved-corner-bottomright"></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
ProductCard.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			colSpan: PropTypes.number.isRequired,
			rowSpan: PropTypes.number.isRequired,
		})
	).isRequired,
};
