import React, { useState } from 'react';
import './GlobalStyles.css';
import { postUserData } from '../services/userService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    forename: '',
    surname: '',
    email: '',
    password: '',
    nationalityId: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert nationalityId to an integer if the field name is nationalityId
    const parsedValue = name === 'nationalityId' ? parseInt(value, 10) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setError('');
    setSuccess(''); // Reset success message before making the request

    try {
      const response = await postUserData(formData); 
      console.log("Response received:", response); 

      if (response && response.status === 201) {
        setSuccess('User registered successfully!');
        console.log(success);
        
        // Optional: Refresh page or navigate after showing the success message
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        // Clear form data after successful registration
        setFormData({
          forename: '',
          surname: '',
          email: '',
          password: '',
          nationalityId: '',
        });
      }
    } catch (error) {
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>} 
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          <span>First Name:</span>
          <input
            type="text"
            name="forename"
            value={formData.forename}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Last Name:</span>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="nationalityId">
  Nationality:
  <select
    id="nationalityId"
    name="nationalityId"
    value={formData.nationalityId}
    onChange={handleChange}
    required
  >
    <option value="">Select your nationality</option>
    <option value="1">Irish</option>
    <option value="2">British</option>
    <option value="3">French</option>
  </select>
</label>
        <div className="button-container">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
