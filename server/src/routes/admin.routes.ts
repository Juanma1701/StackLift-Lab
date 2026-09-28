import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validate";
import { unlockAccountSchema, updateUserSchema, adminMessageSchema } from "../schemas/admin.schema";
import {
  listTickets,
  resolveTicket,
  unlockAccount,
  listUsers,
  updateUser,
  deleteUser,
  sendUserEmail,
  listExerciseImages,
  deleteUserExerciseImage,
} from "../controllers/admin.controller";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/tickets", listTickets);
router.patch("/tickets/:id/resolve", resolveTicket);
router.post("/unlock-account", validate(unlockAccountSchema), unlockAccount);

router.get("/users", listUsers);
router.patch("/users/:id", validate(updateUserSchema), updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users/:id/email", validate(adminMessageSchema), sendUserEmail);

router.get("/exercise-images", listExerciseImages);
router.delete("/exercise-images/:id", deleteUserExerciseImage);

export default router;