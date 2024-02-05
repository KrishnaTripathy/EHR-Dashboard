import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then((result) => {
        console.log(result);
  
        if (result.data) {
          const userData = result.data;
          
          setName(userData.name);
          setAge(userData.age);
          setGender(userData.gender);
        } else {
          console.error('User data is null or undefined.');
          // Handle this case based on your application's requirements.
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  
  
  const updateUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found. Please log in.');
      // You might want to handle this case more gracefully, e.g., redirect to login page.
      return;
    }

    axios.put(`http://localhost:3001/updateUser/${id}`, { name, age, gender }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        console.log(result);
        // After a successful update, fetch the updated data
        fetchUpdatedData();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        navigate('/user');
      });
  };

  const fetchUpdatedData = () => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then((result) => {
        console.log(result);
        const userData = result.data;
        
        setName(userData.name);
        setAge(userData.age);
        setGender(userData.gender);
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={updateUser}>
          <h2>Update User</h2>
          
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Gender</label>
            <input
              type="text"
              placeholder="Enter Gender"
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
