import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// DB_PATH points at the Fly.io volume mount (/data) in production;
// locally it falls back to a file inside the repo.
const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "data", "hari.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resource TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(resource, date, time)
  );

  CREATE INDEX IF NOT EXISTS idx_reservations_resource_date ON reservations(resource, date);

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export default db;
