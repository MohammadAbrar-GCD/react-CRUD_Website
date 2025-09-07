import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch events:', err);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: '1rem' }}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
              </p>
              <p><strong>Location:</strong> {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
