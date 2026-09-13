import { db, sendError, withErrorHandling } from '../_db.js';
import { CATEGORIES } from './categories.js';

async function list(req, res) {
  await withErrorHandling(res, async () => {
    const { rows } = await db.execute(
      'SELECT id, category, description, created_at FROM reports ORDER BY created_at DESC'
    );
    res.status(200).json({
      reports: rows.map((r) => ({
        id: Number(r.id),
        category: r.category,
        description: r.description,
        created_at: r.created_at,
      })),
    });
  });
}

async function create(req, res) {
  const { category, description } = req.body ?? {};

  if (!CATEGORIES.includes(category)) return sendError(res, 400, 'Neznáma kategória.');
  if (!description || !description.trim()) return sendError(res, 400, 'Popis je povinný.');
  if (description.length > 1000) return sendError(res, 400, 'Popis je príliš dlhý (max 1000 znakov).');

  await withErrorHandling(res, async () => {
    const insert = await db.execute({
      sql: 'INSERT INTO reports (category, description) VALUES (?, ?)',
      args: [category, description.trim()],
    });
    const { rows } = await db.execute({
      sql: 'SELECT id, category, description, created_at FROM reports WHERE id = ?',
      args: [insert.lastInsertRowid],
    });
    const r = rows[0];
    res.status(201).json({
      report: { id: Number(r.id), category: r.category, description: r.description, created_at: r.created_at },
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') return list(req, res);
  if (req.method === 'POST') return create(req, res);
  res.setHeader('Allow', 'GET, POST');
  sendError(res, 405, 'Method not allowed');
}
