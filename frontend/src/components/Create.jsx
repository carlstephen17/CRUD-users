import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../API';
import '../styles/CreateStyle.css';
import { TbCancel } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

function Create() {
  // departments
  const [departments, setDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState('');

  // users
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  async function handleCreate(e) {
    e.preventDefault();

    if (!name || !email || !phone || !departmentID) {
      toast.error("All fields are required");
      return;
    }

    if (!email.includes("@gmail.com") && !email.includes("@yahoo.com")) {
      toast.error("Input a correct Gmail or Yahoo address");
      return;
    }

    if (!phone.startsWith("09") || phone.length !== 11) {
      toast.error("Input a correct phone number (starts with 09 and is 11 digits)");
      return;
    }

    try {
      const response = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, department_id: departmentID }),
      });

      if (response.ok) {
        toast.success("User created successfully!");
        navigate('/');
      } else {
        toast.error("Failed to create user");
      }
    } catch (err) {
      toast.error("Error creating user");
      console.error(err);
    }
  }

  async function fetchDepartments() {
    try {
      const response = await fetch(`${API}/departments`);

      if (response.ok) {
        toast.success("Departments fetched successfully!");
        const data = await response.json();
        setDepartments(data);
      }

    } catch (err) {
      toast.error("Error fetching departments");
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  return (
    <div className="main-content">
      <div className="create-container">
        <h2>Create User</h2>

        <form onSubmit={handleCreate}>
          <div className="create-form-group">
            <label>Name</label>
            <input
              type='text'
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="create-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="create-form-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Enter phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="create-form-group">
            <label>Department</label>
            <select
              value={departmentID}
              onChange={e => setDepartmentID(e.target.value)}
            >
              <option value=''>Select Department</option>
              {departments.map(department => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="create-actions">
            <Link to="/" className="btn-cancel"><TbCancel /></Link>
            <button type="submit" className="btn-update"><FaCheck /></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;