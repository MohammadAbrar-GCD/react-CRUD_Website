import pool from '@/lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT er.id, u.full_name, u.email, e.title AS event_title, er.registered_at
      FROM event_registrations er
      JOIN users u ON er.user_id = u.id
      JOIN events e ON er.event_id = e.id
      ORDER BY er.registered_at DESC
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
