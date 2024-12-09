import React from "react";
import { Profile_Avatar } from "./Profile_Avatar";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
	return (
		<div className="absolute z-30 top-0 left-0 flex flex-row justify-between py-2 items-center w-screen px-20 ">
			<img
				src={logo}
				alt="logo"
				className="w-auto h-10 object-cover hover:cursor-pointer hover:scale-[1.05] transition-all duration-500 "
				draggable="false"
			/>

			<div className="flex flex-row gap-20 2xl:text-[22px] lg:text-[20px] py-5 text-[#533B30] font-normal cursor-pointer">
				<Link to="/" className="hover:scale-[1.15] transition-all duration-300">
					Home
				</Link>
				<Link
					to="/product-list"
					className="hover:scale-[1.15] transition-all duration-300"
				>
					Product Listing
				</Link>
				<Link
					to="/aboutus"
					className="hover:scale-[1.15] transition-all duration-300"
				>
					About Us
				</Link>
				<Link
					to="/contactus"
					className="hover:scale-[1.15] transition-all duration-300"
				>
					Contact Us
				</Link>
			</div>

			<div className="flex flex-row items-center gap-5">
				<div className="flex text-[20px] text-[#533B30] font-normal cursor-pointer hover:scale-[1.30] transition-all duration-300">
					<Link
						to="/cart"
						className="hover:scale-[1.15] transition-all duration-300"
					>
						<FontAwesomeIcon icon={faCartShopping} />
					</Link>
				</div>
				<Profile_Avatar />
			</div>
		</div>
	);
}

export default Navbar;
