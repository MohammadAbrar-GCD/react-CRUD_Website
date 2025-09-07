import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required.' });
  }

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = users[0];

    if (!user.is_approved) {
      console.log('User is not approved:', email);
      return res.status(403).json({ message: 'Account not approved yet.' });
    }

    
    console.log('EMAIL:', email);
    console.log('PLAINTEXT PASSWORD:', password);
    console.log('HASH FROM DB:', user.password);

    const match = await bcrypt.compare(password, user.password);

    console.log('PASSWORD MATCH RESULT:', match);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const userData = {
      id: user.id,
      name: user.full_name,
      email: user.email,
      role: user.role,
    };

    res.setHeader('Set-Cookie', serialize('session', JSON.stringify(userData), {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 60 * 2,
  path: '/',
    }));

   

    const redirectTo = user.role === 'staff' ? '/staff' : '/dashboard';

    res.status(200).json({ message: 'Login successful', redirectTo });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
