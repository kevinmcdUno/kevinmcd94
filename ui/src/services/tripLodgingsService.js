const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const postTripLodgings = async(tripLodgingsBody) => {

    try {
        const response = await fetch (`${API_URL}/tripLodgings`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(tripLodgingsBody),
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