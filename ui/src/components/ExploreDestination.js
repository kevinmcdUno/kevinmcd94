// src/components/ExploreDestinations.js
import React, { useState, useEffect } from 'react';
import { getDestinations } from '../apiService';
import './ExploreDestinations.css';

function ExploreDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationData = await getDestinations();
        setDestinations(destinationData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="explore-destinations">
      <h1>Explore Destinations</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            <h2>{destination.name}</h2>
            <p>Available Transport Options:</p>
            <ul>
              {destination.transportOptions.map((option) => (
                <li key={option.id}>
                  {option.mode}: ${option.cost}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExploreDestinations;
