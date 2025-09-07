import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const [users] = await pool.query(
      'SELECT id, full_name, email FROM users WHERE role = "member" AND is_approved = 0'
    );
    res.status(200).json({ users });  
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
}
