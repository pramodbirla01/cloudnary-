import { Router } from "express";
import { uploadImage, getUploads } from "../controllers/uploadController";
import { upload } from "../middlewares/multerConfig";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/uploads", getUploads);

export default router;
