import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userRoutes } from "./08_routes/_routes.index.js";

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

app.use("/api/user", userRoutes);

app.use(setCSPHeader);

app.listen(BACKEND_PORT, () => {
  console.log(`Server listening on port ${BACKEND_PORT}`);
});

export default app;
