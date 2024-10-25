import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { getMessages } from "../controllers/messageController";

const messageRoutes = Router();

// Apply authentication middleware
messageRoutes.post("/send-message", authenticateToken);
messageRoutes.get("/get-messages", authenticateToken, getMessages);

export default messageRoutes;
