// src/components/TripOverview.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTripDetails } from '../apiService';
import './TripOverview.css';

function TripOverview() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const tripData = await getTripDetails(id);
        setTrip(tripData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="trip-overview">
      <h1>{trip.name}</h1>
      <p>Start Date: {trip.start_date}</p>
      <p>End Date: {trip.end_date}</p>
      <h2>Expenses</h2>
      <ul>
        {trip.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.type}: ${expense.cost}
          </li>
        ))}
      </ul>
      <h2>Transportation</h2>
      <ul>
        {trip.transportOptions.map((transport) => (
          <li key={transport.id}>
            {transport.mode}: ${transport.cost}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripOverview;
