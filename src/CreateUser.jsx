import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createUser', { name, age, gender })
      .then(result => {
        console.log(result);
        navigate('/user');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input
              type='text'
              id='age'
              placeholder='Enter Age'
              className='form-control'
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          
          <div className='mb-2'>
            <label htmlFor='gender'>Gender</label>
            <input
              type='text'
              id='gender'
              placeholder='Enter Gender'
              className='form-control'
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          
          <button type='submit' className='btn btn-success'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
