import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { routineNameSchema, muscleGroupSchema, exerciseSchema, workoutLogSchema } from "../schemas/routine.schema";
import {
  listRoutines,
  createRoutine,
  getRoutine,
  renameRoutine,
  deleteRoutine,
  copyDay,
} from "../controllers/routine.controller";
import { createMuscleGroup, deleteMuscleGroup } from "../controllers/muscleGroup.controller";
import {
  createExercise,
  updateExercise,
  deleteExercise,
  uploadExerciseImage,
  deleteExerciseImage,
} from "../controllers/exercise.controller";
import { createWorkoutLog, getLatestLog, listLogs, deleteLog } from "../controllers/workoutLog.controller";
import { getRoutineHistory } from "../controllers/history.controller";
import { upload } from "../config/upload";
import { getCalendarMonth, getDashboardStats } from "../controllers/dashboardStats.controller";
import { exportUserData } from "../controllers/export.controller";

const router = Router();
router.use(requireAuth);

router.get("/routines", listRoutines);
router.post("/routines", validate(routineNameSchema), createRoutine);
router.get("/routines/:id", getRoutine);
router.patch("/routines/:id", validate(routineNameSchema), renameRoutine);
router.delete("/routines/:id", deleteRoutine);
router.get("/routines/:routineId/history", getRoutineHistory);

router.post("/routine-days/:dayId/muscle-groups", validate(muscleGroupSchema), createMuscleGroup);
router.delete("/muscle-groups/:id", deleteMuscleGroup);

router.post("/muscle-groups/:muscleGroupId/exercises", validate(exerciseSchema), createExercise);
router.patch("/exercises/:id", validate(exerciseSchema.partial()), updateExercise);
router.delete("/exercises/:id", deleteExercise);
router.post("/exercises/:id/image", upload.single("image"), uploadExerciseImage);
router.delete("/exercises/:id/image", deleteExerciseImage);

router.post("/exercises/:exerciseId/logs", validate(workoutLogSchema), createWorkoutLog);
router.get("/exercises/:exerciseId/logs/latest", getLatestLog);
router.get("/exercises/:exerciseId/logs", listLogs);
router.delete("/logs/:id", deleteLog);

router.post("/routines/:id/copy-day", copyDay);

router.get("/calendar/:year/:month", getCalendarMonth);
router.get("/stats/dashboard", getDashboardStats);
router.get("/export", requireAuth, exportUserData);

export default router;