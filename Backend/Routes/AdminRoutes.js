import express from "express";
import { DeleteUser, GetUser } from "../Controllers/Admin.js";
import { isAdmin } from "../Middleware/VerifyToken.js";

const AdminRoutes = express.Router();
AdminRoutes.get("/getuser", isAdmin, GetUser);
AdminRoutes.post("/delete/:id", isAdmin, DeleteUser);

export default AdminRoutes;
