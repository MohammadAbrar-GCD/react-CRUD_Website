import { parse } from 'cookie';

export default function MemberDashboard({ user }) {
  if (!user) {
    return <p>Redirecting...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.name}</h1>
      <p>You are logged in as <strong>{user.role}</strong>.</p>
      <p>This is the member dashboard.</p>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies.session ? JSON.parse(cookies.session) : null;

  if (!session || session.role !== 'member') {
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
