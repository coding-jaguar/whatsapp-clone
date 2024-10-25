// src/controllers/fileController.ts
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

// Handle file upload
export const uploadFile = (req: Request, res: Response): void => {
  if (!req.body.fileName) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const fileUrl = `http://localhost:3001/uploads/${req.body.fileName}`;
  res.status(201).json({ success: true, fileUrl });
};

// Handle file download
export const downloadFile = (req: Request, res: Response): void => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../../uploads", fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    res.download(filePath, (downloadErr) => {
      if (downloadErr) {
        console.error("Error downloading file:", downloadErr);
        res.status(500).json({ error: "Failed to download file" });
      }
    });
  });
};
