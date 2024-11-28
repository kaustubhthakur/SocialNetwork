import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null); // User data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Check if user is logged in by checking if token exists
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login'); // If no token, redirect to login
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/profile', {  // Adjust the URL if necessary
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token with the request
          },
        });
        setUser(response.data);  // Store user data in state
      } catch (err) {
        setError('Error fetching user data'); // Handle error
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);  // Set loading to false when done
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [navigate]); // Re-run effect if navigate changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error if fetching fails
  }

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          {/* Add more user fields as needed */}
        </div>
      ) : (
        <div>No user data available</div> // If user data is not available
      )}
    </div>
  );
};

export default Profile;
