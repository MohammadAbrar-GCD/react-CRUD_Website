// src/pages/api/events/index.js

import pool from '@/lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM events');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
