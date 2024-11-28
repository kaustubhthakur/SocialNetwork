import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../../contexts/userContext'; // Assuming this context exists
import "./Navbar.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserLogout from '../../pages/logoutpage/UserLogout';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies are included
      });

      if (response.status === 200) {
        setUser(null); // Clear user context
        localStorage.removeItem('token'); // Remove token
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="https://via.placeholder.com/150x50" alt="Logo" />
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          {user ? (
            <>
            
              <Link to="/profile" className="menu-link">Profile</Link>
              <Link to="/createpost" className="menu-link">Create Post</Link>
              <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
            </>
          ) : (
            <>
              <Link to="/login" className="menu-link">Login</Link>
              <Link to="/register" className="menu-link">Register</Link>
             
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
