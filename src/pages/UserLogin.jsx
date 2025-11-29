import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', password: '', confirmPassword: '' });
  const [orders, setOrders] = useState([]);

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const username = localStorage.getItem('userAuth');

  useEffect(() => {
    generateCaptcha();
    const isUser = localStorage.getItem('userAuth');
    if (isUser) {
      setIsAuthenticated(true);
      const savedOrders = JSON.parse(localStorage.getItem(`${isUser}-orders`)) || [];
      setOrders(savedOrders);
    }
  }, []);

  // ✅ Username must contain @ or $
  const isValidUsername = (username) => {
    const specialChars = /[@$]/;
    return specialChars.test(username);
  };

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captchaText = '';
    for (let i = 0; i < 6; i++) {
      captchaText += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(captchaText);
    setCaptchaInput('');
  };

  const toggleForm = () => setIsSignUp(!isSignUp);

  // ✅ SIGN IN VALIDATION + SPECIAL CHARACTER CHECK
  const handleLogin = (e) => {
    e.preventDefault();

    if (!isValidUsername(loginData.username)) {
      alert("Username must contain at least one special character (@ or $)");
      return;
    }

    if (captchaInput !== captcha) {
      alert('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === loginData.username && u.password === loginData.password
    );

    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('userAuth', loginData.username);
      const savedOrders = JSON.parse(localStorage.getItem(`${loginData.username}-orders`)) || [];
      setOrders(savedOrders);
    } else {
      alert('Invalid credentials');
      generateCaptcha();
    }
  };

  // ✅ SIGN UP VALIDATION + SPECIAL CHARACTER CHECK
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!isValidUsername(signupData.username)) {
      alert("Username must contain at least one special character (@ or $)");
      return;
    }

    if (captchaInput !== captcha) {
      alert('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((u) => u.username === signupData.username)) {
      alert("Username already exists!");
      return;
    }

    users.push({ username: signupData.username, password: signupData.password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup successful! Please login.");

    setIsSignUp(false);
    setSignupData({ username: '', password: '', confirmPassword: '' });
    generateCaptcha();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userAuth');
    setLoginData({ username: '', password: '' });
    navigate('/');
  };

  const addMockOrder = () => {
    const newOrder = {
      id: Date.now(),
      item: `Product ${Math.floor(Math.random() * 100)}`,
      date: new Date().toLocaleString()
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem(`${username}-orders`, JSON.stringify(updatedOrders));
  };

  if (isAuthenticated) {
    return (
      <section style={styles.container}>
        <div style={styles.header}>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
        <div style={styles.section}>
          <h3>User Tools</h3>
          <div style={{ marginBottom: '20px' }}>
            <h4>Profile</h4>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {username}@example.com</p>
          </div>
          <div>
            <h4>Orders</h4>
            {orders.length === 0 ? <p>No orders yet.</p> : (
              <ul>
                {orders.map(order => (
                  <li key={order.id}>{order.item} — <em>{order.date}</em></li>
                ))}
              </ul>
            )}
            <button onClick={addMockOrder} style={styles.button}>Add Random Order</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.container}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setIsSignUp(false)}
          style={{ ...styles.tabButton, backgroundColor: !isSignUp ? '#2f4f4f' : '#ccc' }}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          style={{ ...styles.tabButton, backgroundColor: isSignUp ? '#2f4f4f' : '#ccc' }}
        >
          Sign Up
        </button>
      </div>

      {!isSignUp ? (
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username (must contain @ or $)"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            style={styles.input}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>{captcha}</span>
            <button type="button" onClick={generateCaptcha} style={styles.button}>Refresh</button>
          </div>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleSignUp} style={styles.form}>
          <input
            type="text"
            placeholder="Username (must contain @ or $)"
            value={signupData.username}
            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            style={styles.input}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>{captcha}</span>
            <button type="button" onClick={generateCaptcha} style={styles.button}>Refresh</button>
          </div>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      )}
    </section>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center', minHeight: '80vh', backgroundColor: '#fafafa', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  tabButton: { padding: '10px 20px', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '5px', borderRadius: '5px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '10px 20px', backgroundColor: '#2f4f4f', color: '#f4c430', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  logoutButton: { padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  section: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }
};
