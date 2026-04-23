import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// !===== Routes =====
import {
  userRoutes,
  accessRoutes,
  testRoutes,
  projectRoutes,
  branchRoutes,
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
} from "./00_config/_config.index.js";

dotenv.config();

const app = express();

// Required behind AWS ALB / reverse proxy for correct IPs and secure cookies
app.set("trust proxy", 1);

// ALB health check — placed before helmet/cors so it always responds 200
app.get("/health", (req, res) => res.status(200).send("OK"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      },
    },
  }),
);
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
  }),
);

app.use("/api/admin", projectRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/user", userRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/test", testRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(BACKEND_PORT, () => {
    console.log(`✅ 💻 📟 [SERVER] 🔗 [PORT: ${BACKEND_PORT}] Connected `);
  });
};

startServer();

export default app;
