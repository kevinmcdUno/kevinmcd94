
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const postUserData = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response; 
  } catch (error) {
    console.error('Error posting user data:', error);
    throw error; // Rethrow to be caught by the caller
  }
};



export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
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

