import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

function Register() {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const endpoint = role === 'admin' ? 'http://localhost:3000/registeradmin' : 'http://localhost:3000/registeruser';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        navigate('/login');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Role:
          <select name="role" onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;