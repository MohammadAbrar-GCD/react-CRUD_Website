import { parse } from 'cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageUsers({ user }) {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/unapproved-users').then((res) => {
      setPendingUsers(res.data.users);
    });
  }, []);

  const approveUser = async (id) => {
    await axios.post('/api/approve-user', { id });
    setPendingUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Approve Members</h1>
      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul>
          {pendingUsers.map((user) => (
            <li key={user.id} style={{ marginBottom: '1rem' }}>
              <strong>{user.full_name}</strong> ({user.email})
              <button onClick={() => approveUser(user.id)} style={{ marginLeft: '1rem' }}>
                Approve
              </button>
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

  return { props: { user: session } };
}
