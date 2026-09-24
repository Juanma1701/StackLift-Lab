import { Router } from "express";
import { generateShareLink, revokeShareLink, getShareStatus, getPublicProgress } from "../controllers/share.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Rutas privadas (requieren sesión) — gestionar tu propio link
router.post("/generate", requireAuth, generateShareLink);
router.delete("/revoke", requireAuth, revokeShareLink);
router.get("/status", requireAuth, getShareStatus);

// Ruta pública — sin requireAuth
router.get("/:token", getPublicProgress);

export default router;