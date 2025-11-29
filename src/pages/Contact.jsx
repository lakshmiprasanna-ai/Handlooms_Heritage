import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! We'll reach out at ${form.email} or ${form.phone} soon.`);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fafafa', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#2f4f4f' }}>Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          style={styles.input}
        />
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </section>
  );
}

const styles = {
  input: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  textarea: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' },
  button: { backgroundColor: '#2f4f4f', color: '#f4c430', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }
};
