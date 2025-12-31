import express from "express";
import {
  createPaste,
  getPaste,
  getRecentPastes,
} from "../controllers/pasteController.js";

const router = express.Router();

router.post("/", createPaste);
router.get("/recent", getRecentPastes);
router.get("/:id", getPaste);

export default router;
