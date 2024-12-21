import { Router } from "express";
const router = Router();
import {
  getAll,
  getById,
  getUniqueValues,
} from "../controller/perumahanController.js";

// Endpoint untuk mendapatkan semua data perumahan
router.get("/detail", getAll);

// Endpoint untuk mendapatkan data perumahan berdasarkan ID
router.get("/detail/:id", getById);

router.get("/unique-values", getUniqueValues); // New route for dropdown values

export default router;
