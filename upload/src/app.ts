import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();


const app = express();
app.use(express.json());

// Allow CORS for frontend on port 3000
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}));


app.use("/api", uploadRoutes);

// Global error handler for Multer and other errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (err.name === "MulterError" || err.message?.includes("Invalid file type")) {
		return res.status(400).json({ error: err.message });
	}
	if (err instanceof Error) {
		return res.status(500).json({ error: err.message });
	}
	return res.status(500).json({ error: "An unknown error occurred." });
});

export default app;
