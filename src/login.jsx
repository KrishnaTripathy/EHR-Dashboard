import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { username, password })
  .then(result => {
    console.log(result);
    if (result.data.token) {
      // Store the token in localStorage
      localStorage.setItem('token', result.data.token);

      // Redirect to the '/user' page
      navigate('/user');
    }
  })
  .catch(err => console.log(err));
  }
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="bg-white p-3 rounded-lg col-md-6 col-lg-4">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              autoComplete="name"
              name="username"
              className="form-control rounded-0"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p>Don't have an account yet?</p>
        <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
