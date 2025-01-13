import { useState, useEffect } from 'react';
import { postTripCountries } from '../services/tripCountriesService';
import { postTripLodgings } from '../services/tripLodgingsService';
import { postTripTransports } from '../services/tripTransportsService';
import { getTripData } from '../services/tripService';
import { getCountriesData } from '../services/countriesService';
import { getLodgingTypesData } from '../services/lodgingTypesService';
import { getTransportModesTypeData } from '../services/transportModesService';
import './GlobalStyles.css';

const ManageTrips = () => {
    const [trips, setTrips] = useState([]);
    const [countries, setCountries] = useState([]);
    const [lodgingTypes, setLodgingTypes] = useState([]);
    const [transportModes, setTransportModes] = useState([]);
    const [selectedTripId, setSelectedTripId] = useState('');
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [selectedLodgingTypeId, setSelectedLodgingTypeId] = useState('');
    const [selectedTransportModeId, setSelectedTransportModeId] = useState('');
    const [lodgingCost, setLodgingCost] = useState('');
    const [transportModeCost, setTransportModeCost] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch trips data
                const tripsData = await getTripData(localStorage.getItem('userId'));
                setTrips(tripsData);
  
                // Fetch countries data
                const countriesData = await getCountriesData();
                setCountries(countriesData);
                
                // Fetch lodging types data
                const lodgingTypesData = await getLodgingTypesData();
                setLodgingTypes(lodgingTypesData);

                // Fetch transport modes data
                const transportModesData = await getTransportModesTypeData();
                setTransportModes(transportModesData);
            } catch (error) {
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, []);

    const handleAddCountry = async () => {
        if (selectedTripId && selectedCountryId) {
            try {
                const tripId = parseInt(selectedTripId, 10);
                const countryId = parseInt(selectedCountryId, 10);

                await postTripCountries({
                    tripId: tripId,
                    countryId: countryId,
                });

                setError(''); // Clear previous errors
                alert('Country added successfully to the trip!');
            } catch (error) {
                setError('Failed to add country to the trip.');
            }
        } else {
            setError('Please select both a trip and a country.');
        }
    };

    const handleAddLodging = async () => {
        if (selectedTripId && selectedLodgingTypeId && lodgingCost && !isNaN(lodgingCost)) {
            try {
                const tripId = parseInt(selectedTripId, 10);
                const lodgingTypeId = parseInt(selectedLodgingTypeId, 10);

                await postTripLodgings({
                    tripId: tripId,
                    lodgingTypeId: lodgingTypeId,
                    cost: parseInt(lodgingCost, 10),
                });

                setError(''); // Clear previous errors
                alert('Lodging added successfully to the trip!');
            } catch (error) {
                setError('Failed to add lodging to the trip.');
            }
        } else {
            setError('Please select both a trip and a lodging type, and enter a valid lodging cost.');
        }
    };

    const handleAddTransportMode = async () => {
        if (selectedTripId && selectedTransportModeId && transportModeCost && !isNaN(transportModeCost)) {
            try {
                const tripId = parseInt(selectedTripId, 10);
                const transportModeId = parseInt(selectedTransportModeId, 10);

                await postTripTransports({
                    tripId: tripId,
                    transportModeTypeId: transportModeId,
                    cost: parseInt(transportModeCost, 10),
                });

                setError(''); // Clear previous errors
                alert('Transport mode added successfully to the trip!');
            } catch (error) {
                setError('Failed to add transport mode to the trip.');
            }
        } else {
            setError('Please select both a trip and a transport mode, and enter a valid transport mode cost.');
        }
    };

    return (
        <div>
            <h1>Manage Trips</h1>
            {/* Error Message */}
            {error && <p>{error}</p>}
            
            {/* Trip Selection Dropdown */}
            <div>
                <label htmlFor="trip">Select Trip:</label>
                <select
                    id="trip"
                    value={selectedTripId}
                    onChange={(e) => setSelectedTripId(e.target.value)}
                >
                    <option value="">-- Select a Trip --</option>
                    {trips.map((trip) => (
                        <option key={trip.tripId} value={trip.tripId}>
                            {trip.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Country Selection Dropdown */}
            <div>
                <label htmlFor="country">Select Country:</label>
                <select
                    id="country"
                    value={selectedCountryId}
                    onChange={(e) => setSelectedCountryId(e.target.value)}
                >
                    <option value="">-- Select a Country --</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Add Country Button */}
            <button onClick={handleAddCountry}>Add Country</button>

            {/* Lodging Type Selection Dropdown */}
            <div>
                <label htmlFor="lodging">Select Lodging Type:</label>
                <select
                    id="lodging"
                    value={selectedLodgingTypeId}
                    onChange={(e) => setSelectedLodgingTypeId(e.target.value)}
                >
                    <option value="">-- Select a Lodging Type --</option>
                    {lodgingTypes.map((lodging) => (
                        <option key={lodging.id} value={lodging.id}>
                            {lodging.description}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="lodgingCost">Enter Lodging Cost:</label>
                <input
                    type="number"
                    id="lodgingCost"
                    value={lodgingCost}
                    onChange={(e) => setLodgingCost(e.target.value)}
                />
            </div>
            <button onClick={handleAddLodging}>Add Lodging</button>

            {/* Transport Mode Selection Dropdown */}
            <div>
                <label htmlFor="transport">Select Transport Mode:</label>
                <select
                    id="transport"
                    value={selectedTransportModeId}
                    onChange={(e) => setSelectedTransportModeId(e.target.value)}
                >
                    <option value="">-- Select a Transport Mode --</option>
                    {transportModes.map((mode) => (
                        <option key={mode.id} value={mode.id}>
                            {mode.description}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="transportModeCost">Enter Transport Mode Cost:</label>
                <input
                    type="number"
                    id="transportModeCost"
                    value={transportModeCost}
                    onChange={(e) => setTransportModeCost(e.target.value)}
                />
            </div>
            <button onClick={handleAddTransportMode}>Add Transport Mode</button>
        </div>
    );
};

export default ManageTrips;
