import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../API';
import '../styles/HomeStyle.css';
import { FaUserCircle, FaUserEdit, FaTrash } from "react-icons/fa"; 
import { FaUserPlus } from "react-icons/fa6";
import toast from "react-hot-toast"; 

function Home() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await fetch(`${API}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } else {
        toast.error("Failed to load users"); 
      }
    } catch (err) {
      toast.error("Error fetching users");
      console.error(err);
    }
  }

  async function handleDeleteAll() {
    if (window.confirm("Are you sure you want to delete all users?")) {
      try {
        const response = await fetch(`${API}/users`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("All users deleted successfully");
          fetchUsers();
        }
      } catch (err) {
        toast.error("Could not delete users");
        console.error("Error deleting users:", err);
      }
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API}/users/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("User deleted"); 
          fetchUsers();
        }
      } catch (err) {
        toast.error("Error deleting user");
        console.error("Error deleting user:", err);
      }
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <div className="app-container">
    <div className="main-content">
      <div className="header-container">
        <h2 className="header-title">Users Data</h2>
        <div className="btns">
          <Link to="/create" className="create-btn">
            <FaUserPlus />
          </Link>
          <button
            className="deleteAll-btn"
            onClick={handleDeleteAll}
            disabled={users.length === 0}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="linkBtns">
                    <Link to={`/read/${user.id}`} className="read"><FaUserCircle /></Link>
                    <Link to={`/edit/${user.id}`} className="editHome"><FaUserEdit /></Link>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user.id)}
                    ><FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Home;