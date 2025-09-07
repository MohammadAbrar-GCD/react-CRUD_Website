import { parse } from 'cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StaffDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <p>Redirecting...</p>;
  }

  useEffect(() => {
    axios.get('/api/staff/unapproved-users')
      .then(res => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

  const approveUser = async (id) => {
    try {
      await axios.post('/api/staff/approve-user', { id });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.name}</h1>
      <p>You are logged in as <strong>{user.role}</strong>.</p>
      <p>This is the staff dashboard.</p>

      <h2 style={{ marginTop: '2rem' }}>Pending Member Approvals</h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.full_name} ({user.email})
              <button style={{ marginLeft: '1rem' }} onClick={() => approveUser(user.id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies.session ? JSON.parse(cookies.session) : null;

  if (!session || session.role !== 'staff') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
}
