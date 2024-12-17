const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const postTripTransports = async(tripTransportBody) => {

    try {
        const response = await fetch (`${API_URL}/tripTransports`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(tripTransportBody),
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