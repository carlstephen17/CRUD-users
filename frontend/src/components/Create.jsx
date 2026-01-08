import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../API';
import '../styles/CreateStyle.css';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;

  async function handleCreate(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      alert('Enter a valid Email address');
      return;
    } 
    if (!name|| !email  || !phone) {
      alert("All fields are required");
      return;
    }

    if (!phone.startsWith("09") || phone.length !== 11) {
      alert("Enter a correct phone number (starts with 09 and must be 11 digits)");
      return;
    }

    try {
      const response = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="create-form-container">
      <h2>Create User</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="tel"
          placeholder="Enter phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;