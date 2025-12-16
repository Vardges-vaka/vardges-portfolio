import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// !===== Routes =====
import {
  userRoutes,
  accessRoutes,
  testRoutes,
  projectRoutes,
} from "./08_routes/_routes.index.js";

// !===== Middlewares =====
import {
  i18nHandler,
  i18nMiddleware,
} from "./05_middlewares/_mddlwre.index.js";

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

// i18n middleware - must be before routes
app.use(i18nHandler);
app.use(i18nMiddleware);

app.use(
  "/static",
  express.static("public", {
    maxAge: "7d",
    immutable: true,
  })
);
connectDB();

app.use("/api/admin", projectRoutes);
app.use("/api/user", userRoutes); ///    /api/user/auth/signup
app.use("/api/access", accessRoutes); // /api/user/auth/signup
app.use("/api/test", testRoutes); // /api/test/i18n

app.use(setCSPHeader);

app.listen(BACKEND_PORT, () => {
  console.log(`✅ 💻 📟 [SERVER] 🔗 [PORT: ${BACKEND_PORT}] Connected `);
});

export default app;
