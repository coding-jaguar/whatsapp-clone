import { Router } from "express";
import { sendMessage } from "../controllers/messageController";
import { getContacts } from "../controllers/contactsController";
import { authenticateToken } from "../middleware/authMiddleware";

const contactRoutes = Router();

// Apply authentication middleware
contactRoutes.get("/send-message", (req, res) => {
  res.status(200).json({ message: "Message sent successfully" });
});
contactRoutes.get("/get-all-contacts", authenticateToken, getContacts);

export default contactRoutes;
