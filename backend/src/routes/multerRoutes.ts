// src/routes/fileRoutes.ts
import express from "express";
import { upload } from "../utils/multerConfig";
import { uploadFile, downloadFile } from "../controllers/multerController";

const multerRoutes = express.Router();

// Route to upload a file
multerRoutes.post("/upload", upload.single("file"), uploadFile);

// Route to download a file by filename
multerRoutes.get("/download/:fileName", downloadFile);

export default multerRoutes;
