import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import authRoutes from "./routes/auth.routes";
import routineRoutes from "./routes/routine.routes";
import { errorHandler } from "./middleware/errorHandler";
import shareRoutes from "./routes/share.routes";
import checkinRoutes from "./routes/checkin.routes";

const app = express();

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:4173"].filter(Boolean);

app.use(helmet({ crossOriginResourcePolicy: false })); // false para que las imágenes de /uploads carguen bien desde el cliente
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

app.use("/api/auth", authRoutes);
app.use("/api", routineRoutes);

app.use(errorHandler);

app.use("/api/share", shareRoutes);

app.use("/api/checkins", checkinRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));