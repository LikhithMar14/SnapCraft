import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserDesigns, getUserDesignsById, saveDesign, deleteDesign } from "../controller/design.controller";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getUserDesigns);
router.get("/:id", getUserDesignsById);
router.post("/", saveDesign);
router.delete("/:id", deleteDesign);

export default router;
 