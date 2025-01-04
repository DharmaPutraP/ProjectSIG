import "dotenv/config";
// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import perumahanRoutes from "./routes/perumahanRoutes.js";
import authRouter from "./routes/authRouter.js";
app.use("/api/perumahan", perumahanRoutes);
app.use("/api/auth", authRouter);

import mongoose from "mongoose";
import exp from "constants";

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Start server
// import bcrypt from "bcryptjs";
// const pas = await bcrypt.hash("admin", 10);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
