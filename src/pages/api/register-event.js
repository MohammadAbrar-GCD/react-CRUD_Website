import pool from '@/lib/db';
import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const cookies = parse(req.headers.cookie || '');
  const session = cookies.session ? JSON.parse(cookies.session) : null;

  if (!session || session.role !== 'member') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ message: 'Event ID required' });
  }

  try {
    // Check if already registered
    const [existing] = await pool.query(
      'SELECT * FROM event_registrations WHERE user_id = ? AND event_id = ?',
      [session.id, eventId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Already registered' });
    }

    // Register
    await pool.query(
      'INSERT INTO event_registrations (user_id, event_id) VALUES (?, ?)',
      [session.id, eventId]
    );

    res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Error registering for event:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
