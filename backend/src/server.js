import express from "express";
import cors from 'cors';
import notesRoutes from "./routes/noteRoutes.js";
import dotenv from "dotenv";
import { DbConnect } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "https://your-frontend-app.onrender.com", // deployed frontend
  "http://localhost:5173" // local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// middlewares
app.use(express.json()); // passing json middleware
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// After Database Connection to Server Start
DbConnect().then(() => {
  app.listen(PORT, () => console.log(`server running on port ${PORT} `));
});
