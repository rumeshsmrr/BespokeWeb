import UserModel from "../Models/user.js";

const GetUser = async (req, res) => {
	try {
		const user = await UserModel.find();
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ message: "Error fetching user" });
	}
};

const DeleteUser = async (req, res) => {
	try {
		const userID = req.params.id;
		const checkAdmin = await UserModel.findById(userID);

		if (checkAdmin.role == "admin") {
			return res.status(403).json({ message: "Cannot delete admin user" });
		}
		const user = await UserModel.findByIdAndDelete(userID);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting user" });
	}
};

export { GetUser, DeleteUser };
