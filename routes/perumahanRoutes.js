import { Router } from "express";
const router = Router();
import { getAll, getById } from "../controller/perumahanController.js";

// Endpoint untuk mendapatkan semua data perumahan
router.get("/", getAll);

// Endpoint untuk mendapatkan data perumahan berdasarkan ID
router.get("/:id", getById);

export default router;
