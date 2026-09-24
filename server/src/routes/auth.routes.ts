import { Router } from "express";
import rateLimit from "express-rate-limit";
import { register, login, logout, me, updateProfile, uploadAvatar } from "../controllers/auth.controller";
import { forgotPassword, resetPassword } from "../controllers/passwordReset.controller";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema, updateProfileSchema } from "../schemas/auth.schema";
import { upload } from "../config/upload";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20,
  message: { message: "Demasiados intentos. Intenta de nuevo en unos minutos." },
});

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.patch("/me", requireAuth, validate(updateProfileSchema), updateProfile);
router.post("/me/avatar", requireAuth, upload.single("image"), uploadAvatar);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

export default router;