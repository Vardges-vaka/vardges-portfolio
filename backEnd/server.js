// import dns from "dns";
// dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);
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
  branchRoutes,
  brandRoutes,
  employeeRoutes,
  settingsRoutes,
  // ! Cloud Kitchen Routes
  cK_menuRoutes,
  ck_Mn_CategoryRoutes,
  ck_Mn_ItemRoutes,
  ck_Mn_It_ModifierRoutes,
  ck_Mn_It_Md_OptionRoutes,
} from "./08_routes/_routes.index.js";

// !===== Middlewares =====
import {
  i18nHandler,
  i18nMiddleware,
  auth_mddlwre,
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
// ! menu routes

app.use("/api/menus", auth_mddlwre, cK_menuRoutes);
app.use("/api/menuCategories", auth_mddlwre, ck_Mn_CategoryRoutes);
app.use("/api/menuItems", auth_mddlwre, ck_Mn_ItemRoutes);
app.use("/api/menuItemModifiers", auth_mddlwre, ck_Mn_It_ModifierRoutes);
app.use("/api/menuItemModifierOptions", auth_mddlwre, ck_Mn_It_Md_OptionRoutes);

app.use("/api/branches", branchRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/settings", auth_mddlwre, settingsRoutes);
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
