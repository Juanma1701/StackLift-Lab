import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { createTicketSchema, createAuthenticatedTicketSchema } from "../schemas/support.schema";
import { createTicket, createAuthenticatedTicket } from "../controllers/support.controller";

const router = Router();

const ticketLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Demasiados mensajes enviados. Intenta de nuevo más tarde." },
});

router.post("/tickets", ticketLimiter, validate(createTicketSchema), createTicket);
router.post(
  "/tickets/mine",
  requireAuth,
  ticketLimiter,
  validate(createAuthenticatedTicketSchema),
  createAuthenticatedTicket
);

export default router;