import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../src/Components/Navbar";
import Footer from "../src/Components/Footer";

const UserLayout = () => {
	const user = useSelector((state) => state.Auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user]);

	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default UserLayout;
