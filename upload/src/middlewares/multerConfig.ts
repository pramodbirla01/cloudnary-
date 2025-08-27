import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const allowedFormats = ["image/jpeg", "image/png"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (!allowedFormats.includes(file.mimetype)) {
      throw new Error("Invalid file type. Only JPG & PNG allowed.");
    }
    return {
      folder: "uploads",
      format: file.mimetype.split("/")[1], // jpg or png
      public_id: Date.now().toString(),
    };
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max
  fileFilter: (req, file, cb) => {
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("❌ Invalid file type. Only JPG & PNG allowed."));
    }
  },
});
