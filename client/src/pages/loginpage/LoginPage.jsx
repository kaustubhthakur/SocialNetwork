import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../contexts/userContext'; // Import the user context

const Profile = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { user, setUser } = useContext(UserDataContext); // Access user data from context
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      navigate('/login'); // If no token, redirect to login page
      return;
    }

    const fetchUserData = async () => {
      try {
        // Make the API call to fetch the user data
        const response = await axios.get('http://localhost:8000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        });

        setUser(response.data); // Update context with user data
      } catch (err) {
        setError('Error fetching user data'); // Set error if the request fails
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchUserData(); // Fetch the user data on component mount
  }, [navigate, setUser]); // Dependencies: navigate and setUser

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          {/* Display other user details here */}
        </div>
      ) : (
        <div>No user data available</div> // If no user data available
      )}
    </div>
  );
};

export default Profile;
