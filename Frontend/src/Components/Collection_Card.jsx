import React from "react";
import img1 from "../assets/Collection/image1.png";
import img2 from "../assets/Collection/image2.png";
import img3 from "../assets/Collection/image3.png";
import img4 from "../assets/Collection/image4.png";
import img5 from "../assets/Collection/image5.png";
import img6 from "../assets/Collection/image6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Collection_Card = () => {
	const variants = {
		hidden: { opacity: 0, y: 50 }, // Start hidden and below
		visible: { opacity: 1, y: 0 }, // End visible and in place
	};
	return (
		<>
			<div className=" flex flex-col px-5 justify-center items-center h-auto gap-0 overflow-hidden ">
				{/* header text */}
				<h1 className="font-normal 2xl:text-[80px] xl:text-[80px] lg:text-[70px] text-[#533B30] text-center">
					Transforming Timber into
					<br /> Timeless Masterpieces
				</h1>

				{/* Second Header  */}
				<div className="flex flex-row justify-center mt-10 items-center">
					<h1 className="font-normal text-[80px] text-[#533B30] text-center">
						We are
					</h1>
					<div className="h-[2px] bg-[#533B30] w-[45vw] mt-2 mx-4"></div>
					<h1 className="font-normal text-[80px] text-[#533B30] text-center">
						Artisans
					</h1>
				</div>

				{/* chair & Desscription  */}
				<div className="flex flex-row justify-between items-center gap-20 mt-10 ">
					<div className="rounded-[40px] overflow-hidden  h-[60vh] w-[30vw] ">
						<img
							src={img1}
							alt="chair image"
							className="h-full w-full object-cover"
							draggable="false"
						/>
					</div>
					<span className="font-normal text-[35px] text-[#533B30] text-left w-[55vw] px-5">
						At Bespoke Furniture, we believe in the timeless beauty of
						craftsmanship and the art of storytelling through wood. Each of our
						creations is more than just furniture—it’s a masterpiece that
						embodies elegance, heritage, and unparalleled artistry.
					</span>
				</div>

				{/* image grid  */}
				<div className="flex flex-row justify-evenly gap-32 my-20">
					<div className="rounded-[40px] overflow-hidden max-w-[25vw] h-[60vh]">
						<img
							src={img2}
							alt="furniture image"
							className="h-full w-full object-cover"
							draggable="false"
						/>
					</div>
					<div className="rounded-[40px] overflow-hidden max-w-[25vw] h-[60vh]">
						<img
							src={img3}
							alt="furniture image"
							className="h-full w-full object-cover"
							draggable="false"
						/>
					</div>
					<div className="rounded-[40px] overflow-hidden max-w-[25vw] h-[60vh]">
						<img
							src={img4}
							alt="furniture image"
							className="h-full w-full object-cover"
							draggable="false"
						/>
					</div>
				</div>

				{/* chair image with description  */}
				<div className="flex flex-row items-center justify-center gap-20 mx-20 w-full mt-20 ">
					<span className="font-normal text-[35px] text-[#533B30] text-left w-[40vw] px-5">
						Let this exquisite rattan armchair tell its story in your space.
						Crafted for elegance and comfort, it invites you to connect with
						timeless design. Have questions? Talk with us to find your perfect
						fit
					</span>
					<div className="rounded-[40px] overflow-hidden  h-[80vh] w-[44vw] ">
						<img
							src={img5}
							alt="chair image"
							className="h-full w-full object-cover"
							draggable="false"
						/>
					</div>
				</div>

				{/* Furniture image with description  */}
				<div className="flex flex-row items-center justify-center gap-20 mx-20 w-full">
					<div className="rounded-[40px] overflow-hidden  h-[80vh] w-[44vw] ">
						<img
							src={img6}
							alt="chair image"
							className="h-full w-full object-cover"
							draggable="false"
						/>
					</div>
					<span className="font-normal text-[35px] text-[#533B30] text-left w-[40vw] px-5">
						Experience luxury redefined with this hand-carved armchair, a
						testament to artistry and comfort. Its regal charm speaks
						volumes—let’s make it yours. Talk with us to bring it home.
					</span>
				</div>

				{/* Talk with us title & contact button  */}

				<div className="flex flex-col text-[80px] justify-center items-center p-10 mb-10">
					<h1 className="font-normal  text-[#533B30] text-center -mb-0">
						Talk with us
					</h1>
					<Link to="/contactus">
						<button className="bg-[#533B30] text-white rounded-[10px] hover:scale-105 transition-all duration-300 h-10 w-40 items-center gap-4 text-[22px] font-thin flex flex-row justify-center px-4 ">
							Contact Us
							<div className="rounded-[50px] w-6 h-6 border-[2px] text-center justify-center items-center border-white flex flex-row content-center">
								<FontAwesomeIcon
									icon={faArrowRight}
									className="self-center l-2 w-3 h-3 fa-light -rotate-45"
								/>
							</div>
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Collection_Card;
