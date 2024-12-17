const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getLodgingTypesData = async () => {
    try {
      const response = await fetch(`${API_URL}/lodgingTypes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error('Error retrieving lodging type data:', error);
      throw error; 
    }
  };
  