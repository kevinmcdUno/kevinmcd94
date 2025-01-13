import React, { useState } from 'react';
import { postTripData } from '../services/tripService';
import './AddTrip.css';

function AddTrip() {
  const [name, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = localStorage.getItem('userId');

  const handleSaveTripDetails = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

   
      const tripBody = {
        name,
        description,
        startDate,
        endDate,
        userId,
      };

      await postTripData(tripBody);
    
         // Show success message
         setSuccess('Trip added successfully!');
        
         // Clear form fields after success
         setTripName('');
         setDescription('');
         setStartDate('');
         setEndDate('');


  };

  return (
    <div className="add-trip-container">
      <div className="navigation">
        <button>Dashboard</button>
        <button>Trips</button>
        <button>Explore</button>
      </div>
      <h2>Create New Trip</h2>
      <form>
        <label>Trip Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setTripName(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>} 
        {success && <p className="success-message">{success}</p>} 

        <button
          type="button"
          className="save-button"
          onClick={handleSaveTripDetails}
        >
          Save Trip Details
        </button>
      </form>
    </div>
  );
}

export default AddTrip;
