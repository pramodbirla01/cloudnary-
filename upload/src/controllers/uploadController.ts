import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Upload } from "../entities/Upload";

const uploadRepository = AppDataSource.getRepository(Upload);

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newUpload = uploadRepository.create({
      filename: req.file.originalname,
      url: (req.file as any).path, // Cloudinary URL
    });

    await uploadRepository.save(newUpload);

    return res.status(201).json(newUpload);
  } catch (err) {
    let errorMsg = "";
    if (err instanceof Error) {
      errorMsg = err.message;
    } else if (typeof err === "string") {
      errorMsg = err;
    } else {
      errorMsg = JSON.stringify(err);
    }
    return res.status(500).json({ error: "Upload failed", details: errorMsg });
  }
};

export const getUploads = async (req: Request, res: Response) => {
  const uploads = await uploadRepository.find({ order: { createdAt: "DESC" } });
  return res.json(uploads);
};
