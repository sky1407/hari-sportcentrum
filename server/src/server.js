import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";
import reservationsRoutes from "./routes/reservations.js";
import reportsRoutes from "./routes/reports.js";
import { ExpressError } from "./utils/ExpressError.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationsRoutes);
app.use("/api/reports", reportsRoutes);

app.use((req, res, next) => {
  next(new ExpressError("Not found", 404));
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  if (status === 500) console.error(err);
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Hari Sportcentrum API running on http://localhost:${PORT}`);
});
