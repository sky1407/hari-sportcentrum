import { db, sendError, withErrorHandling } from '../_db.js';
import { isValidResource, generateSlots } from '../_resources.js';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default async function handler(req, res) {
  const { resource, date } = req.query;

  if (!isValidResource(resource)) return sendError(res, 400, 'Neznáma prevádzka.');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return sendError(res, 400, 'Neplatný dátum.');
  if (date < todayISO()) return sendError(res, 400, 'Dátum je v minulosti.');

  await withErrorHandling(res, async () => {
    const allSlots = generateSlots(resource, date);
    const { rows } = await db.execute({
      sql: 'SELECT time FROM reservations WHERE resource = ? AND date = ?',
      args: [resource, date],
    });
    const taken = new Set(rows.map((r) => r.time));
    res.status(200).json({ slots: allSlots.map((time) => ({ time, taken: taken.has(time) })) });
  });
}
