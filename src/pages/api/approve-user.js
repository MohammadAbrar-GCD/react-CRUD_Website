import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    await pool.query('UPDATE users SET is_approved = 1 WHERE id = ?', [id]);
    res.status(200).json({ message: 'User approved.' });
  } catch (err) {
    console.error('Approval error:', err);
    res.status(500).json({ message: 'Database error.' });
  }
}
