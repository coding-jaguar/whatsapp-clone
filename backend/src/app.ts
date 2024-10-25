import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import { authenticateToken } from "./middleware/authMiddleware";
import messageRoutes from "./routes/messagingRoutes";
import multer from "multer";
import path from "path";
import multerRoutes from "./routes/multerRoutes";

const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use("/file", multerRoutes);
// Serve the files in the "uploads" folder
app.use(
  "/uploads",
  authenticateToken,
  express.static(path.join(__dirname, "../uploads"))
);
app.use(express.json());

// API routes
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/messages", authenticateToken, messageRoutes);

// Export the app (used in server.ts)
export default app;
