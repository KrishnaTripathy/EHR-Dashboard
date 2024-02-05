import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        username: userName,
        password: password,
        name: name,
        age: age,
        gender: gender,
        role: userType,
      });
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Error details:', error.response?.data);
    }
  }
  

  
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="bg-white p-3 rounded-lg col-md-6 col-lg-4">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Register As
            <input
              type="radio"
              name="userType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="userType"
              value="admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          
          <div className="mb-3">
            <label htmlFor="username" autoComplete="username">
              <strong>UserName</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
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
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" autoComplete="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" autoComplete="age">
              <strong>Age</strong>
            </label>
            <input
              type="number"
              placeholder="Enter Age"
              autoComplete="off"
              name="age"
              className="form-control rounded-0"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" autoComplete="gender">
              <strong>Gender</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Gender"
              autoComplete="off"
              name="gender"
              className="form-control rounded-0"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
