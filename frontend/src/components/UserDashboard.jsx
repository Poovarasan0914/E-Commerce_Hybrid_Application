import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/UserDashboard.css';

function UserDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch the application details from the server
    fetch('http://localhost:3000/applications')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched applications:', data.applications); // Add logging here
        setApplications(data.applications || []);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  return (
    <div className="user-dashboard-container">
      <h1>User Dashboard</h1>
      <Link to="/apply">Apply for Passport</Link>
      <h2>Passport Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Passport Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.dob}</td>
                <td>{app.address}</td>
                <td>{app.passportType}</td>
                <td>{app.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No applications found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;