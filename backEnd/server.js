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
  // ! Cloud Kitchen — general
  cK_gen_branchRoutes,
  cK_gen_contractRoutes,
  cK_gen_cuisineTagRoutes,
  cK_gen_customerRoutes,
  cK_gen_employeeRoutes,
  cK_gen_equipmentRoutes,
  cK_gen_integrationRoutes,
  cK_gen_invoiceRoutes,
  cK_gen_ratingRoutes,
  cK_gen_salesChannelRoutes,
  cK_gen_salesChannelMetricsRoutes,
  cK_gen_salesPlatformRoutes,
  // ! Cloud Kitchen — marketing
  cK_mkt_campaignRoutes,
  cK_mkt_adSpendRoutes,
  // ! Cloud Kitchen — brand
  cK_brnd_brandRoutes,
  cK_brnd_competitorRoutes,
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

// ! cloudKitchen_general routes
app.use("/api/branch", auth_mddlwre, cK_gen_branchRoutes);
app.use("/api/contract", auth_mddlwre, cK_gen_contractRoutes);
app.use("/api/cuisineTag", auth_mddlwre, cK_gen_cuisineTagRoutes);
app.use("/api/customer", auth_mddlwre, cK_gen_customerRoutes);
app.use("/api/employee", auth_mddlwre, cK_gen_employeeRoutes);
app.use("/api/equipment", auth_mddlwre, cK_gen_equipmentRoutes);
app.use("/api/integration", auth_mddlwre, cK_gen_integrationRoutes);
app.use("/api/invoice", auth_mddlwre, cK_gen_invoiceRoutes);
app.use("/api/rating", auth_mddlwre, cK_gen_ratingRoutes);
app.use("/api/salesChannel", auth_mddlwre, cK_gen_salesChannelRoutes);
app.use("/api/salesChannelMetrics", auth_mddlwre, cK_gen_salesChannelMetricsRoutes);
app.use("/api/salesPlatform", auth_mddlwre, cK_gen_salesPlatformRoutes);

// ! cloudKitchen_marketing routes
app.use("/api/campaign", auth_mddlwre, cK_mkt_campaignRoutes);
app.use("/api/adSpend", auth_mddlwre, cK_mkt_adSpendRoutes);

// ! cloudKitchen_brand routes
app.use("/api/brand", auth_mddlwre, cK_brnd_brandRoutes);
app.use("/api/competitor", auth_mddlwre, cK_brnd_competitorRoutes);

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
