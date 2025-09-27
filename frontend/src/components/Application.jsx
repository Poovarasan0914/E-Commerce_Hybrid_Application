import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Application.css';

function Application() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    passportType: 'normal',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate('/user');
        } else {
          alert('Application failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="application-container">
      <h1>Passport Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            className="form-control" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label>Date of Birth</label>
          <input 
            type="date" 
            name="dob" 
            className="form-control" 
            value={formData.dob} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <input 
            type="text" 
            name="address" 
            className="form-control" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            placeholder="Enter your full address"
          />
        </div>
        
        <div className="form-group">
          <label>Passport Type</label>
          <div className="passport-type-options">
            <label 
              className={`passport-option ${formData.passportType === 'normal' ? 'selected' : ''}`}
            >
              <input 
                type="radio" 
                name="passportType" 
                value="normal" 
                checked={formData.passportType === 'normal'} 
                onChange={handleChange} 
              />
              <div className="passport-option-title">Normal</div>
              <div className="passport-option-description">Standard processing time (4-6 weeks)</div>
              <div className="check-mark"></div>
            </label>
            
            <label 
              className={`passport-option ${formData.passportType === 'tatkal' ? 'selected' : ''}`}
            >
              <input 
                type="radio" 
                name="passportType" 
                value="tatkal" 
                checked={formData.passportType === 'tatkal'} 
                onChange={handleChange} 
              />
              <div className="passport-option-title">Tatkal</div>
              <div className="passport-option-description">Expedited processing (1-3 days)</div>
              <div className="check-mark"></div>
            </label>
          </div>
        </div>
        
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
      
      <div className="form-footer">
        Already have a passport? <a href="/renew">Renew here</a>
      </div>
    </div>
  );
}

export default Application;