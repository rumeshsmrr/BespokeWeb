import React, { useState } from "react";
import background_img from "../assets/Landing_Background.png";

function Landing() {
	return (
		<div className="relative w-screen h-screen overflow-hidden bg-[#ffffff] ">
			<div className="circle-div1 absolute -bottom-30 z-10 left-1/2 transform -translate-x-1/2 w-[35vw] h-[35vw] rounded-full bg-[#cfb09a] overflow-hidden"></div>
			<div className="circle-div absolute bottom-[-50%] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] rounded-full bg-[#cfb09a] overflow-hidden">
				<img
					src={background_img}
					alt="background image"
					className="w-full h-full object-cover"
					draggable="false"
				/>
			</div>

			<div className="text-container flex flex-col justify-center items-center absolute left-[50%] -translate-x-[50%] text-[#533B30] z-20 h-full select-none">
				<h1 className="text-[160px]">Bespoke&nbsp;Furniture</h1>
				<h2 className="text-[120px]">by Artisan</h2>
			</div>
		</div>
	);
}

export default Landing;
