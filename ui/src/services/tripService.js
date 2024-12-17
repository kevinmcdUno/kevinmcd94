const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const postTripData = async(tripBody) => {

    try {
        const response = await fetch (`${API_URL}/trips`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(tripBody),
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


export const getTripData = async(userId) => {
    try {
        const response = await fetch(`${API_URL}/trips?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok){
                throw new Error (`HTTP Error status: ${response.status}`)
            }
            const data = await response.json();
            return data;
         } catch (error) {
            console.error('Error retrieving trip data:', error);
            throw error; 
          }
        };
