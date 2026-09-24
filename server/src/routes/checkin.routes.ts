import { Router } from "express";
import { saveCheckIn, getTodayCheckIn, getCheckInByDate, listCheckIns } from "../controllers/checkin.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, saveCheckIn);
router.get("/today", requireAuth, getTodayCheckIn);
router.get("/", requireAuth, listCheckIns);
router.get("/:date", requireAuth, getCheckInByDate);

export default router;