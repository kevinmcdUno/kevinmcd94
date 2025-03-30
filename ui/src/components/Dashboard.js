import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../services/userService';
import { getTripData } from '../services/tripService';
import './GlobalStyles.css';

function Dashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null); // State to hold user data
  const [trips, setTrips] = useState([]); // State to hold trips data
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
  
    // Check if userId exists in localStorage
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const userData = await getUserData(userId);
        setUserProfile(userData);
      } catch (error) {
        setError('Failed to fetch user data.');
      }
    };

    // Fetch trip data
    const fetchTripData = async () => {
      try {
        const tripsData = await getTripData(userId); // Fetch trips array
        setTrips(tripsData); // Update state with fetched trips array
      } catch (error) {
        setError('Failed to fetch trip data.');
      }
    };

    fetchUserData();
    fetchTripData();
  }, []);

  // If loading data or on error
  if (!userProfile) {
    return error ? <p>{error}</p> : <p>Loading...</p>;
  }

  // Extract necessary fields from the userProfile object
  const { first_name, second_name, email, nationalities } = userProfile;

  const handleAddTrip = () => {
    navigate('/add-trip');
  };

  const handleTrips = () => {
    navigate('/manage-trips');
  };

  const handleDestinations = () => {
    navigate('/destinations');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* User Profile Section */}
      <section className="user-profile">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {`${first_name} ${second_name}`}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Nationality:</strong> {nationalities?.name || 'Not provided'}</p>
      </section>

      {/* Upcoming Trips Section */}
      <section className="upcoming-trips">
        <h2>Upcoming Trips</h2>
        {trips.length > 0 ? (
          <ul>
            {trips.map((trip, index) => (
              <li key={index}>
                <h3>{trip.name}</h3>
                <p><strong>Start Date:</strong> {trip.startDate}</p>
                <p><strong>End Date:</strong> {trip.endDate}</p>
              {/* Display Countries */}
          <p><strong>Countries:</strong></p>
          {trip.countries && trip.countries.length > 0 ? (
            <ul>
              {trip.countries.map((country, i) => (
                <li key={i}>{country}</li>
              ))}
            </ul>
          ) : (
            <p>No countries added yet.</p>
          )}

          {/* Display Transport Modes */}
          <p><strong>Transport Modes:</strong></p>
          {trip.transports && trip.transports.length > 0 ? (
            <ul>
              {trip.transports.map((transport, i) => (
                <li key={i}>
                  {transport.description} - ${transport.cost}</li>
              ))}
            </ul>
          ) : (
            <p>No transport modes added yet.</p>
          )}

          {/* Display Lodgings */}
          <p><strong>Lodgings:</strong></p>
          {trip.lodgings && trip.lodgings.length > 0 ? (
            <ul>
              {trip.lodgings.map((lodging, i) => (
                <li key={i}>
                  {lodging.description} - ${lodging.cost}
                  </li>
              ))}
            </ul>
          ) : (
            <p>No lodgings added yet.</p>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p>No upcoming trips. Start planning now!</p>
  )}
</section>

      {/* Planning Section */}
      <section className="planning-section">
        <h2>Plan a New Trip</h2>
        <form className="planning-form">
          <button onClick={handleAddTrip}>Create New Trip</button>
          <button onClick={handleTrips}>Manage Trips</button>
          <button onClick={handleDestinations}>Explore Destinations</button>
        </form>
      </section>
    </div>
  );
}

export default Dashboard;
