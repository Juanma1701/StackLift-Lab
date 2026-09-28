import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  logout,
  me,
  updateProfile,
  uploadAvatar,
  verifyEmail,
  resendVerificationEmail,
  verifyTwoFactorLogin,
  setupTwoFactor,
  confirmTwoFactor,
  disableTwoFactor,
  listTrustedDevices,
  revokeTrustedDevice,
} from "../controllers/auth.controller";
import { forgotPassword, resetPassword } from "../controllers/passwordReset.controller";
import { requireAuth } from "../middleware/auth";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validate";
import { validateImageContent } from "../middleware/validateImageContent";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  twoFactorCodeSchema,
  verifyTwoFactorLoginSchema,
} from "../schemas/auth.schema";
import { upload } from "../config/upload";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Demasiados intentos. Intenta de nuevo en unos minutos." },
});

const passiveAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: "Demasiados intentos. Intenta de nuevo en unos minutos." },
});

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/2fa/verify-login", authLimiter, validate(verifyTwoFactorLoginSchema), verifyTwoFactorLogin);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.patch("/me", requireAuth, validate(updateProfileSchema), updateProfile);
router.post("/me/avatar", requireAuth, upload.single("image"), validateImageContent, uploadAvatar);
router.post("/forgot-password", passiveAuthLimiter, forgotPassword);
router.post("/reset-password", passiveAuthLimiter, resetPassword);
router.get("/verify-email/:token", passiveAuthLimiter, verifyEmail);
router.post("/resend-verification", passiveAuthLimiter, resendVerificationEmail);

router.post("/2fa/setup", requireAuth, requireAdmin, setupTwoFactor);
router.post("/2fa/confirm", requireAuth, requireAdmin, validate(twoFactorCodeSchema), confirmTwoFactor);
router.post("/2fa/disable", requireAuth, requireAdmin, validate(twoFactorCodeSchema), disableTwoFactor);
router.get("/2fa/trusted-devices", requireAuth, requireAdmin, listTrustedDevices);
router.delete("/2fa/trusted-devices/:id", requireAuth, requireAdmin, revokeTrustedDevice);

export default router;