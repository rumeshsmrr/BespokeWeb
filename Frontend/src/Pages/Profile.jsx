import React, { useState, useRef, useEffect } from "react";
import profile_img from "../assets/profile_img.webp";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faImage } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { put, get } from "../../Services/ApiEndPoint";
import { useNavigate } from "react-router-dom";
import AccordionCustomStyles from "../Components/accordion";
import axios from "axios";

function Profile() {
	const user = useSelector((state) => state.Auth.user);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [imgpath, setImgpath] = useState(user.profileImage);
	useEffect(() => {
		document.title = "Bespoke Furniture | Profile";
		if (!user.profileImage) {
			setImgpath(profile_img); // Assign default image
		}
	}, [user.profileImage]);
	const fileInputRef = useRef(null);

	const [imageseleted, setimageselected] = useState("");
	const [purchaseHistory, setPurchaseHistory] = useState([]);

	//Fetch History Data
	useEffect(() => {
		const fetchPurchaseHistory = async () => {
			try {
				const response = await get(`/api/v1/purchase-history/user/${user._id}`);
				setPurchaseHistory(response.data); // Assuming the response data is an array of purchase history
			} catch (error) {
				console.error("Error fetching purchase history:", error);
			}
		};

		if (user) {
			fetchPurchaseHistory();
		}
	}, [user]);

	//console.log(user);
	const [mobile, setMobile] = useState(user.mobile || "");
	const [address, setAddress] = useState(user.address || "");

	const handleToggle = () => {
		setIsEditing((prev) => !prev);
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const uploadImage = async () => {
		const formData1 = new FormData();
		formData1.append("file", imageseleted);
		formData1.append("upload_preset", "xw4yrog1");

		try {
			const response = await axios.post(
				"https://api.cloudinary.com/v1_1/pasi123/image/upload",
				formData1
			);
			console.log("Uploaded image:", response.data);
			return response.data.secure_url;
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image.");
			throw error;
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		try {
			let uploadedImageUrl = null;

			if (imageseleted) {
				uploadedImageUrl = await uploadImage();
			}

			const updatedData = {
				mobile,
				address,
				profileImage: uploadedImageUrl,
			};

			const request = await put(`/api/auth/update/${user._id}`, updatedData);

			if (request.status === 200) {
				// toast.success(request.data.message || "Update successfully!");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
				window.location.reload();
				// setTimeout(() => {
				// 	window.location.reload();
				// }, 2000);
				toast.success(request.data.message || "Update successfully!");
			}
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "An error occurred.");
		}
		setIsEditing(false);
	};

	return (
		<div className="flex flex-col mt-5">
			<div className="flex flex-row px-10">
				<div className="flex flex-col w-1/2  justify-center items-center px-14">
					<div className="text-[30px] font-normal text-[#533B30] mb-3 self-start">
						My Profile
					</div>
					<div className="relative rounded-[10px] overflow-hidden bg-[#e2e2e2] h-[45vh] w-[45vh]">
						<img
							src={imgpath}
							alt="profile picture"
							className="object-cover w-full h-full"
							draggable="false"
						/>
						<button
							className="absolute top-0 m-3 flex flex-row bg-white items-center justify-center w-[30px] h-[30px] rounded-[30px] hover:scale-125 transition-all duration-200 "
							onClick={handleButtonClick}
						>
							<FontAwesomeIcon
								icon={faImage}
								className={`self-center pl-0 pt-0 w-4 h-4  text-[20px] text-[#303c53b5] `}
							/>
						</button>

						<input
							type="file"
							accept="image/*"
							ref={fileInputRef}
							style={{ display: "none" }}
							onChange={(event) => {
								const selectedFile = event.target.files[0];
								setimageselected(selectedFile);
								const fileURL = URL.createObjectURL(selectedFile);
								setImgpath(fileURL);
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col text-left  p-16 pl-16  w-full  m-5 pt-32">
					<div className="profile_card w-full overflow-hidden">
						<div className="text-[24px] ml-4 font-normal text-[#533B30]">
							Name
						</div>
						<input
							className="text-[18px] px-3 py-1 rounded-[20px] ml-1 outline-[#d2815c]  w-[30vw] font-light mb-4 text-[#533B30] bg-transparent"
							type="text"
							disabled={!isEditing}
							defaultValue={user.name}
						></input>
					</div>
					<div className="profile_card w-full overflow-hidden">
						<div className="text-[24px] ml-4  font-normal  text-[#533B30]">
							Email
						</div>
						<input
							className="text-[18px] px-3 py-1 rounded-[20px] ml-1 outline-[#d2815c]  w-[30vw] font-light mb-4 text-[#533B30] bg-transparent"
							type="text"
							disabled={!isEditing}
							defaultValue={user.email}
						></input>
					</div>
					<div className="profile_card w-full overflow-hidden">
						<div className="text-[24px] ml-4  font-normal  text-[#533B30]">
							Phone Number
						</div>
						<input
							className="text-[18px] px-3 py-1 rounded-[20px] ml-1 outline-[#d2815c]  w-[30vw] font-light mb-4 text-[#533B30] bg-transparent"
							type="text"
							disabled={!isEditing}
							defaultValue={user.mobile}
							onChange={(e) => setMobile(e.target.value)}
						></input>
					</div>
					<div className="profile_card w-full overflow-hidden flex flex-row justify-between">
						<div className="div">
							<div className="text-[24px] ml-4  font-normal text-[#533B30]">
								Address
							</div>
							<input
								className="text-[18px] px-3 py-1 rounded-[20px] ml-1 outline-[#d2815c] text-wrap w-[40vw] font-light bg-transparent mb-4 text-[#533B30] "
								type="text"
								disabled={!isEditing}
								defaultValue={user.address}
								onChange={(e) => setAddress(e.target.value)}
							></input>
						</div>

						<div className="flex flex-row items-center justify-center mt-3 gap-5 p-5">
							<button
								onClick={handleToggle}
								className={` w-10 h-10 rounded-[20px] border-[1px] border-[#533b30b5] active:scale-125 transition-all duration-200 ${
									isEditing ? "bg-[#533b30b5] text-white" : ""
								}`}
							>
								<FontAwesomeIcon
									icon={faUserPen}
									className={`self-center pl-1 pt-1 w-6 h-6 text-[20px] text-[#303c53b5] ${
										isEditing ? "text-[#ffffff]" : ""
									}`}
								/>
							</button>
							<button
								type="submit"
								onClick={handleUpdate}
								className={`bg-[#533B30] text-[20px] h-10 active:border-[1.5px] active:border-[#533b30b5] 
              w-28 rounded-[10px] text-center py-1 text-white hover:scale-110 transition-all 
              duration-300 active:bg-white active:text-[#533b30da] ${
								!isEditing ? "pointer-events-none opacity-50" : ""
							}`}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center px-10 text-left">
				<h1 className="font-normal text-3xl text-[#533B30] pl-2 py-5">
					Purchase History
				</h1>
				<AccordionCustomStyles purchaseHistory={purchaseHistory} />
			</div>
		</div>
	);
}

export default Profile;
