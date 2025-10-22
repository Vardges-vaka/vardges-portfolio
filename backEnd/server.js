import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// !===== Routes =====
import { userRoutes, accessRoutes } from "./08_routes/_routes.index.js";

// !===== Config =====
import {
  corsOptions,
  connectDB,
  SESSION_CONFIG,
  BACKEND_PORT,
  setCSPHeader,
} from "./00_config/_config.index.js";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(SESSION_CONFIG);
app.use(
  "/static",
  express.static("public", {
    maxAge: "7d",
    immutable: true,
  })
);
connectDB();

app.use("/api/user", userRoutes); ///    /api/user/auth/signup
app.use("/api/access", accessRoutes); // /api/user/auth/signup

app.use(setCSPHeader);

app.listen(BACKEND_PORT, () => {
  console.log(`✅ 💻 📟 [SERVER] 🔗 [PORT: ${BACKEND_PORT}] Connected `);
});

export default app;
