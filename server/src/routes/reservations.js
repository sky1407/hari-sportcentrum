import { Router } from "express";
import { db } from "../db.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ExpressError } from "../utils/ExpressError.js";
import { RESOURCES, isValidResource, generateSlots } from "../lib/resources.js";

const router = Router();

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

router.get("/resources", (req, res) => {
  const resources = Object.entries(RESOURCES).map(([id, r]) => ({
    id,
    label: r.label,
    priceInfo: r.priceInfo,
    hoursText: r.hoursText,
  }));
  res.json({ resources });
});

router.get(
  "/slots",
  catchAsync(async (req, res) => {
    const { resource, date } = req.query;
    if (!isValidResource(resource)) throw new ExpressError("Neznáma prevádzka.", 400);
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new ExpressError("Neplatný dátum.", 400);
    if (date < todayStr()) throw new ExpressError("Dátum je v minulosti.", 400);

    const allSlots = generateSlots(resource, date);
    const taken = new Set(
      db.prepare("SELECT time FROM reservations WHERE resource = ? AND date = ?").all(resource, date).map((r) => r.time)
    );

    res.json({ slots: allSlots.map((time) => ({ time, taken: taken.has(time) })) });
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const rows = db.prepare("SELECT * FROM reservations ORDER BY date DESC, time DESC").all();
    res.json({ reservations: rows });
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { resource, date, time, name, phone, note } = req.body;
    if (!isValidResource(resource)) throw new ExpressError("Neznáma prevádzka.", 400);
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayStr()) {
      throw new ExpressError("Neplatný dátum.", 400);
    }
    if (!time || !generateSlots(resource, date).includes(time)) {
      throw new ExpressError("Neplatný časový slot.", 400);
    }
    if (!name || !name.trim()) throw new ExpressError("Meno je povinné.", 400);
    if (!phone || !phone.trim()) throw new ExpressError("Telefón je povinný.", 400);

    try {
      const info = db
        .prepare("INSERT INTO reservations (resource, date, time, name, phone, note) VALUES (?, ?, ?, ?, ?, ?)")
        .run(resource, date, time, name.trim(), phone.trim(), note?.trim() || null);
      const reservation = db.prepare("SELECT * FROM reservations WHERE id = ?").get(info.lastInsertRowid);
      res.status(201).json({ reservation });
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
        throw new ExpressError("Tento termín je už obsadený, vyber si prosím iný.", 409);
      }
      throw err;
    }
  })
);

export default router;
