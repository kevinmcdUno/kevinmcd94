const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getCountriesData = async () => {
    try {
      const response = await fetch(`${API_URL}/countries`, {
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
      console.error('Error retrieving user data:', error);
      throw error; 
    }
  };
  