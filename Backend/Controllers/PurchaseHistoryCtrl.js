import PurchaseHistory from "../Models/PurchaseHistory.js";

// Create a new purchase history
const createPurchaseHistory = async (req, res) => {
	try {
		const {
			user,
			purchaseId,
			products,
			totalAmount,
			paymentMethod,
			paymentStatus,
			orderNotes,
			discount,
			invoiceUrl,
		} = req.body;

		const purchaseHistory = new PurchaseHistory({
			user,
			purchaseId,
			products,
			totalAmount,
			paymentMethod,
			paymentStatus,
			orderNotes,
			discount,
			invoiceUrl,
		});

		await purchaseHistory.save();
		res.status(201).json({
			message: "Purchase history created successfully",
			purchaseHistory,
		});
	} catch (error) {
		console.error("Error creating purchase history:", error);
		res.status(500).json({ message: error.message || "Internal server error" });
	}
};

// Get purchase history by user ID
const getPurchaseHistoryByUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const purchaseHistory = await PurchaseHistory.find({
			user: userId,
		}).populate("products.products");

		if (!purchaseHistory || purchaseHistory.length === 0) {
			return res
				.status(404)
				.json({ message: "No purchase history found for this user" });
		}

		res.status(200).json(purchaseHistory);
	} catch (error) {
		console.error("Error fetching purchase history:", error);
		res.status(500).json({ message: error.message || "Internal server error" });
	}
};

// Get all purchase histories (admin access)
const getAllPurchaseHistories = async (req, res) => {
	try {
		const purchaseHistories = await PurchaseHistory.find()
			.populate("user")
			.populate("products.products");
		res.status(200).json(purchaseHistories);
	} catch (error) {
		console.error("Error fetching purchase histories:", error);
		res.status(500).json({ message: error.message || "Internal server error" });
	}
};

// Delete a purchase history by ID
const deletePurchaseHistory = async (req, res) => {
	try {
		const { id } = req.params;
		const purchaseHistory = await PurchaseHistory.findByIdAndDelete(id);

		if (!purchaseHistory) {
			return res.status(404).json({ message: "Purchase history not found" });
		}

		res.status(200).json({ message: "Purchase history deleted successfully" });
	} catch (error) {
		console.error("Error deleting purchase history:", error);
		res.status(500).json({ message: error.message || "Internal server error" });
	}
};

export {
	createPurchaseHistory,
	getPurchaseHistoryByUser,
	getAllPurchaseHistories,
	deletePurchaseHistory,
};
