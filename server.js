import "dotenv/config";
// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import perumahanRoutes from "./routes/perumahanRoutes.js";
// const perumahanRoutes = require("./routes/perumahanRoutes");
app.use("/api/perumahan", perumahanRoutes);


import mongoose from "mongoose";

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
