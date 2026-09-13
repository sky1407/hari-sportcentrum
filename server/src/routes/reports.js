import { Router } from "express";
import { db } from "../db.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ExpressError } from "../utils/ExpressError.js";

const router = Router();

export const CATEGORIES = ["Posilňovacie stroje", "Kardio zóna", "Šatne a sprchy", "Vybavenie", "Iné"];

router.get("/categories", (req, res) => {
  res.json({ categories: CATEGORIES });
});

router.get(
  "/",
  catchAsync(async (req, res) => {
    const rows = db.prepare("SELECT id, category, description, created_at FROM reports ORDER BY created_at DESC").all();
    res.json({ reports: rows });
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { category, description } = req.body;
    if (!CATEGORIES.includes(category)) throw new ExpressError("Neznáma kategória.", 400);
    if (!description || !description.trim()) throw new ExpressError("Popis je povinný.", 400);
    if (description.length > 1000) throw new ExpressError("Popis je príliš dlhý (max 1000 znakov).", 400);

    const info = db.prepare("INSERT INTO reports (category, description) VALUES (?, ?)").run(category, description.trim());
    const report = db
      .prepare("SELECT id, category, description, created_at FROM reports WHERE id = ?")
      .get(info.lastInsertRowid);
    res.status(201).json({ report });
  })
);

export default router;
