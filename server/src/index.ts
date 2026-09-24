import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import authRoutes from "./routes/auth.routes";
import routineRoutes from "./routes/routine.routes";
import shareRoutes from "./routes/share.routes";
import checkinRoutes from "./routes/checkin.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Necesario en Railway: hay un proxy delante de tu app.
// Sin esto, rate-limit y cualquier lectura de IP ven la IP del proxy, no la del cliente real.
app.set("trust proxy", 1);

const allowedOrigins = [process.env.CLIENT_URL, "https://gym-tracker-innovacode1.vercel.app"].filter(Boolean);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rate limit general para toda la API
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Demasiadas solicitudes, intenta de nuevo más tarde" },
});
app.use("/api", globalLimiter);

// Rate limit estricto solo para login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Demasiados intentos de acceso, espera unos minutos" },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Health check, sin tocar la BD
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", routineRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/checkins", checkinRoutes);

// Error handler: SIEMPRE al final, después de todas las rutas
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));