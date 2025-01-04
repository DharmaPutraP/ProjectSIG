import { Router } from "express";
const router = Router();
import {
  getAll,
  getById,
  getUniqueValues,
  createPerumahan,
  uploadImage,
  deletePerumahan,
} from "../controller/perumahanController.js";
import {
  authenticateUser,
  authorizedPermissionsSettings,
} from "../middleware/authMiddleware.js";

// Endpoint untuk mendapatkan semua data perumahan
router.get("/detail", getAll);

// Endpoint untuk mendapatkan data perumahan berdasarkan ID
router.get("/detail/:id", getById);

router.get("/unique-values", getUniqueValues); // New route for dropdown values
router.post(
  "/create",
  authenticateUser,
  authorizedPermissionsSettings("admin"),
  uploadImage,
  createPerumahan
);
router.delete(
  "/:id",
  authenticateUser,
  authorizedPermissionsSettings("admin"),
  deletePerumahan
);

export default router;
