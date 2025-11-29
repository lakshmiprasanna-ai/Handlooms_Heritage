import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    backgroundColor: '#2e4057',
    color: '#fff',
    flexWrap: 'wrap'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    fontWeight: '500'
  };

  const logoStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem'
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        Handloom <span style={{ color: '#f4c430' }}>Fashion</span>
      </div>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/cart" style={linkStyle}>Cart ({cartCount})</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/user" style={linkStyle}>User Login</Link>
        <Link to="/admin" style={linkStyle}>Admin</Link>
      </div>
    </nav>
  );
}
