import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import clientRoutes from "./routes/clientRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/api", clientRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle server shutdown
process.on("SIGINT", async () => {
  await client.end();
  process.exit();
});
