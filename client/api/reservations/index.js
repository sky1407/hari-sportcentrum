import { db, sendError, withErrorHandling } from '../_db.js';
import { isValidResource, generateSlots } from '../_resources.js';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

async function list(req, res) {
  await withErrorHandling(res, async () => {
    const { rows } = await db.execute('SELECT * FROM reservations ORDER BY date DESC, time DESC');
    res.status(200).json({
      reservations: rows.map((r) => ({
        id: Number(r.id),
        resource: r.resource,
        date: r.date,
        time: r.time,
        name: r.name,
        phone: r.phone,
        note: r.note,
        created_at: r.created_at,
      })),
    });
  });
}

async function create(req, res) {
  const { resource, date, time, name, phone, note } = req.body ?? {};

  if (!isValidResource(resource)) return sendError(res, 400, 'Neznáma prevádzka.');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayISO()) {
    return sendError(res, 400, 'Neplatný dátum.');
  }
  if (!time || !generateSlots(resource, date).includes(time)) {
    return sendError(res, 400, 'Neplatný časový slot.');
  }
  if (!name || !name.trim()) return sendError(res, 400, 'Meno je povinné.');
  if (!phone || !phone.trim()) return sendError(res, 400, 'Telefón je povinný.');

  await withErrorHandling(res, async () => {
    const insert = await db.execute({
      sql: 'INSERT INTO reservations (resource, date, time, name, phone, note) VALUES (?, ?, ?, ?, ?, ?)',
      args: [resource, date, time, name.trim(), phone.trim(), note?.trim() || null],
    });
    const { rows } = await db.execute({
      sql: 'SELECT * FROM reservations WHERE id = ?',
      args: [insert.lastInsertRowid],
    });
    const r = rows[0];
    res.status(201).json({
      reservation: {
        id: Number(r.id),
        resource: r.resource,
        date: r.date,
        time: r.time,
        name: r.name,
        phone: r.phone,
        note: r.note,
        created_at: r.created_at,
      },
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') return list(req, res);
  if (req.method === 'POST') return create(req, res);
  res.setHeader('Allow', 'GET, POST');
  sendError(res, 405, 'Method not allowed');
}
