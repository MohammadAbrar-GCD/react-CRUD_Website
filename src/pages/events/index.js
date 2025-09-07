import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const res = await axios.post('/api/register-event', { eventId });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upcoming Events</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: '1rem' }}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-GB')} | 
                <strong> Time:</strong> {event.time}
              </p>
              <p><strong>Location:</strong> {event.location}</p>
              <button onClick={() => handleRegister(event.id)}>
                Register
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
