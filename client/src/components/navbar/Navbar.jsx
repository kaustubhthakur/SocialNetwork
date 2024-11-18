import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyLogo</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${menuOpen ? 'rotate1' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'fade' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'rotate2' : ''}`}></span>
      </div>
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
        <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
