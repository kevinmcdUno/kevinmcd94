import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getCountriesData } from '../services/countriesService';

const ExploreDestination = () => {
  const [selectedCountry, setSelectedCountry] = useState(null); // Selected country details
  const [countriesData, setCountriesData] = useState([]); // Store country data

  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  useEffect(() => {
    // Fetch the country data when the component mounts
    getCountriesData()
      .then((data) => {
        setCountriesData(data);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      });
  }, []);

  const handleCountryClick = (countryName) => {
    const country = countriesData.find((c) => c.name === countryName);
    setSelectedCountry(country); // Update selected country
  };

  return (
    <div className="map-container">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // No need for the 'country' variable anymore
              const isSelected = selectedCountry && selectedCountry.name === geo.properties.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSelected ? "#FF5722" : "#D3D3D3"} // Highlight selected country
                  stroke="#000"
                  onClick={() => handleCountryClick(geo.properties.name)} // Trigger country info on click
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {selectedCountry && (
        <div className="tooltip">
          <h3>{selectedCountry.name}</h3>
          <p><strong>Language:</strong> {selectedCountry.language}</p>
          <p><strong>Currency:</strong> {selectedCountry.currency}</p>
        </div>
      )}
    </div>
  );
};

export default ExploreDestination;
