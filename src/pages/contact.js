export default function Contact() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Reach us via:</p>

      <ul>
        <li><strong>Phone:</strong> +353 123 4567</li>
        <li><strong>Email:</strong> info@griffithsportsclub.ie</li>
        <li><strong>Address:</strong> Griffith Sports Club, Dublin, Ireland</li>
      </ul>

      <p>Or drop us a message using the form below (optional for now):</p>

      <form>
        <input type="text" placeholder="Your Name" style={{ display: 'block', marginBottom: '1rem' }} />
        <input type="email" placeholder="Your Email" style={{ display: 'block', marginBottom: '1rem' }} />
        <textarea placeholder="Your Message" rows={5} style={{ display: 'block', marginBottom: '1rem', width: '100%' }} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
