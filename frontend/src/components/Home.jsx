import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Passport Automation System</h1>
      <div className="button-container">
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;