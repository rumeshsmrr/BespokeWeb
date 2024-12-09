import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Register from "./Pages/Register";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import UserLayout from "../Layouts/UserLayout";
import PublicLayout from "../Layouts/PublicLayout";
import { useDispatch } from "react-redux";
import { updateUser } from "./Redux/AuthSlice";
import Profile from "./Pages/Profile";
import ProductList from "./Pages/ProductList";
import ProductDescription from "./Pages/ProductDescription";
import CartPage from "./Pages/CartPage";
import ContactUs from "./Pages/ContactUs";
import ProductAdding from "./Pages/Admin/ProductAdding";
import UserManagement from "./Pages/Admin/UserManagement";
import Dashboard from "./Pages/Admin/Dashboard";
import Inventory from "./Pages/Admin/Inventory";

function App() {
	const user = useSelector((state) => state.Auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (user) {
			dispatch(updateUser());
		}
	}, [user]);

	return (
		<BrowserRouter>
			<Toaster position="top-center" containerStyle={{ top: 60 }} />
			<Routes>
				<Route path="/" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/product-list" element={<ProductList />} />
					<Route path="/contactus" element={<ContactUs />} />
					<Route
						path="/product-description/:id"
						element={<ProductDescription />}
					/>
					<Route path="/cart" element={<CartPage />} />
				</Route>

				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="inventory" element={<Inventory />} />
					<Route path="product" element={<ProductAdding />} />
					<Route path="user-management" element={<UserManagement />} />
				</Route>

				<Route path="/" element={<PublicLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
