import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

let schemaReady = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = db.migrate([
      `CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resource TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        note TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        UNIQUE(resource, date, time)
      )`,
      `CREATE INDEX IF NOT EXISTS idx_reservations_resource_date ON reservations(resource, date)`,
      `CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    ]);
  }
  return schemaReady;
}

export function sendError(res, status, message) {
  res.status(status).json({ error: message });
}

export async function withErrorHandling(res, fn) {
  try {
    await ensureSchema();
    await fn();
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT' || err.extendedCode === 'SQLITE_CONSTRAINT_UNIQUE') {
      return sendError(res, 409, 'Tento termín je už obsadený, vyber si prosím iný.');
    }
    console.error(err);
    sendError(res, 500, 'Niečo sa pokazilo. Skús to prosím znova.');
  }
}
