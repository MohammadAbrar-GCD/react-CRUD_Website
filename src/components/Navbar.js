import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  const getRoleFromCookie = () => {
    const sessionCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('session='));

    if (sessionCookie) {
      try {
        const session = JSON.parse(decodeURIComponent(sessionCookie.split('=')[1]));
        return session.role;
      } catch (err) {
        console.error('Invalid session cookie');
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    const updateRole = () => {
      const currentRole = getRoleFromCookie();
      setRole(currentRole);
    };

    // Run on mount
    updateRole();

    // Re-run on route change (login/logout)
    const handleRouteChange = () => {
      updateRole();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const linkStyle = {
    marginRight: '1rem',
    color: '#000',
    textDecoration: 'none',
    fontWeight: 'normal',
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link href="/" style={linkStyle}>Home</Link>
      <Link href="/services" style={linkStyle}>Services</Link>
      <Link href="/membership" style={linkStyle}>Membership</Link>
      <Link href="/events" style={linkStyle}>Events</Link>
      <Link href="/news" style={linkStyle}>News</Link>
      <Link href="/contact" style={linkStyle}>Contact</Link>

      {role === 'staff' && (
        <>
          <Link href="/staff" style={linkStyle}>Staff Dashboard</Link>
          <Link href="/staff/event-registrations" style={linkStyle}>Registrations</Link>
          <Link href="/staff/manage-users" style={linkStyle}>Manage Users</Link>
        </>
      )}

      {role === 'member' && (
        <Link href="/dashboard" style={linkStyle}>My Dashboard</Link>
      )}

      {role ? (
        <Link href="/logout" style={linkStyle}>Logout</Link>
      ) : (
        <>
          <Link href="/login" style={linkStyle}>Login</Link>
          <Link href="/register" style={linkStyle}>Register</Link>
        </>
      )}
    </nav>
  );
}
