import pool from '@/lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({ message: 'Connected!', result: rows[0].result });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message });
  }
}