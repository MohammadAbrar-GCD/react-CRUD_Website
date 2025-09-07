import { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'cookie';

export default function EventRegistrations({ user }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get('/api/staff/event-registrations')
      .then((res) => setRegistrations(res.data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Event Registrations</h1>
      {registrations.length === 0 ? (
        <p>No one has registered for any events yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Event Title</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>{reg.full_name}</td>
                <td>{reg.email}</td>
                <td>{reg.event_title}</td>
                <td>{new Date(reg.registered_at).toLocaleString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Only staff can access
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
