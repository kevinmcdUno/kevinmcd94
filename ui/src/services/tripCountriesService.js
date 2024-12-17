const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const postTripCountries = async(tripCountryBody) => {

    try {
        const response = await fetch (`${API_URL}/tripCountries`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(tripCountryBody),
     });
    

    if (!response.ok ) {
        throw new Error (`HTTP Error status, ${response.status}`);
    }
    return response;
 } catch (error) {
        console.error('Error posting user data:', error);
        throw error; // Rethrow to be caught by the caller
      }
};