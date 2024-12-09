import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ContactUs = () => {
	//Change title
	useEffect(() => {
		document.title = "Bespoke Furniture | Contact Us";
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Sending email using EmailJS
		emailjs
			.sendForm(
				"service_lm7prhb", // Replace with your service ID
				"template_xfne9w8", // Replace with your template ID
				e.target,
				"6czlw-_Aj55wO2zjA" // Replace with your user ID
			)
			.then(
				(response) => {
					console.log("SUCCESS!", response);
					toast.success("Your message has been sent successfully!");
					handleClear();
				},
				(error) => {
					console.log("FAILED...", error);
					toast.error(
						"There was an issue sending your message. Please try again later."
					);
				}
			);
	};

	const handleClear = () => {
		setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
		});
	};

	return (
		<div className="bg-gray-50 py-12 px-6 sm:px-8">
			<div className="mx-10 text-center">
				{/* Contact Form */}

				<div className="flex flex-row justify-center items-center gap-10">
					<div className="flex flex-col my-10">
						<h1 className="text-[50px] max-w-[42vw] px-10 text-left">
							We are here to assist you with every detail, ensuring your
							questions are answered and your bespoke journey is seamless.
						</h1>

						<div className="flex flex-row justify-between">
							<div className="flex flex-col justify-between gap-10 px-10 mt-10">
								<div className="flex flex-col justify-start text-left">
									<span className="text-[22px]">call center</span>
									<span>074 325 4127</span>
									<span>011 2 546 452</span>
								</div>

								<div className="flex flex-col justify-start text-left">
									<span className="text-[22px]">Email</span>
									<span>bespokefurniute@artisan.com</span>
								</div>
							</div>

							<div className="flex flex-col justify-between px-10 gap-10 mt-10">
								<div className="flex flex-col justify-start text-left">
									<span className="text-[22px]">Our location</span>
									<span className="text-wrap">
										The Artisan Courtyard, <br />
										45 Mahogany Avenue, <br />
										Nuwara Eliya, <br />
										Sri Lanka
									</span>
								</div>

								<div className="flex flex-col">
									<span className="font-semibold text-gray-800 mb-4 text-[22px]">
										Social Networks
									</span>
									<div className="flex flex-row justify-center gap-6">
										{/* Facebook Tile */}
										<div className="flex flex-col items-center">
											<a
												href="https://www.facebook.com"
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full shadow-xl hover:bg-blue-100 transition-all duration-300"
											>
												<img
													src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
													alt="Facebook"
													className="w-full h-full"
													draggable="false"
												/>
											</a>
										</div>

										{/* Twitter Tile */}
										<div className="flex flex-col items-center">
											<a
												href="https://www.youtube.com"
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full shadow-xl hover:bg-blue-100 transition-all duration-300"
											>
												<img
													src="https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"
													alt="Twitter"
													className="w-full h-full"
													draggable="false"
												/>
											</a>
										</div>

										{/* Instagram Tile */}
										<div className="flex flex-col items-center">
											<a
												href="https://www.instagram.com"
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 flex items-center justify-center overflow-hidden  bg-blue-50 rounded-full shadow-xl hover:bg-blue-100  hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transition-all duration-300"
											>
												<img
													src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
													alt="Instagram"
													className="w-full h-full"
													draggable="false"
												/>
											</a>
										</div>

										{/* LinkedIn Tile */}
										<div className="flex flex-col items-center">
											<a
												href="https://www.linkedin.com"
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full overflow-hidden shadow-xl hover:bg-blue-100 transition-all duration-300"
											>
												<img
													src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/24/d6/34/24d634ef-e355-7e9d-900a-9e9663c25977/AppIcon-0-1x_U007emarketing-0-8-0-85-220-0.png/230x0w.webp"
													alt="LinkedIn"
													className="w-full h-full"
													draggable="false"
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
						<h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
							Connect with us
						</h1>
						<p className="text-lg text-gray-600 mb-12 px-10">
							Each piece we create carries a story—yours. Share your dreams with
							us, and our artisans will shape them into timeless designs crafted
							exclusively for your space.
						</p>
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 sm:grid-cols- gap-6">
								<div className="flex flex-col">
									<input
										type="text"
										id="name"
										name="name"
										className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
										placeholder="Enter your name"
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="flex flex-col">
									<input
										type="email"
										id="email"
										name="email"
										className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
										placeholder="Enter your email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="mt-6 flex flex-col">
								<input
									type="text"
									id="subject"
									name="subject"
									className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
									placeholder="Enter the subject"
									value={formData.subject}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="mt-6 flex flex-col">
								<textarea
									id="message"
									name="message"
									rows="5"
									className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
									placeholder="Write your message here..."
									value={formData.message}
									onChange={handleChange}
									required
								></textarea>
							</div>
							<div className="flex flex-row gap-4 text-[18px]">
								<button
									type="button"
									className="mt-6 w-[150px] py-2 h-10 text-[#533B30] border-[1.5px] border-[#7a6358] bg-white font-semibold rounded-[20px] shadow-md hover:bg-[#e2e2e2] focus:outline-none focus:ring-2 focus:ring-[#533B30]"
									onClick={handleClear}
								>
									Clear
								</button>
								<button
									type="submit"
									className="mt-6 w-[150px] py-2 h-10 bg-[#533B30] text-white font-semibold rounded-[20px] shadow-md hover:bg-[#3e2c21] focus:outline-none focus:ring-2 focus:ring-[#533B30]"
								>
									Send a Message
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Office Address & Map */}
				<div className="m-auto mt-20">
					<div className="relative gap-12 rounded-[30px] overflow-hidden">
						{/* Embed Google Map */}
						<div className=" h-72 shadow-xl">
							<iframe
								width="100%"
								height="100%"
								frameBorder="0"
								style={{ border: 0 }}
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15193.352372215015!2d80.77616154039413!3d6.948527713157612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!5e0!3m2!1sen!2slk!4v1733567832457!5m2!1sen!2slk"
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
							<div className="absolute top-0 bg-[#533b30b0] w-full h-full"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
