import React, { useState, useEffect } from 'react';
import '../css/AdminDashboard.css';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications from the server
    fetch('http://localhost:3000/applications')
      .then(response => response.json())
      .then(data => setApplications(data.applications || []))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const handleApprove = (id) => {
    // Approve application logic
    fetch(`http://localhost:3000/applications/${id}/approve`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Update application status in state
        setApplications(applications.map(app => app._id === id ? { ...app, status: 'approved' } : app));
      })
      .catch(error => console.error('Error approving application:', error));
  };

  const handleReject = (id) => {
    // Reject application logic
    fetch(`http://localhost:3000/applications/${id}/reject`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Update application status in state
        setApplications(applications.map(app => app._id === id ? { ...app, status: 'rejected' } : app));
      })
      .catch(error => console.error('Error rejecting application:', error));
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Passport Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app._id}</td>
              <td>{app.name}</td>
              <td>{app.dob}</td>
              <td>{app.address}</td>
              <td>{app.passportType}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleApprove(app._id)}>Approve</button>
                <button onClick={() => handleReject(app._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;