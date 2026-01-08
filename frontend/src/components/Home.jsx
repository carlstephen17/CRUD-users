import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../API';
import '../styles/HomeStyle.css';

function Home() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await fetch(`${API}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } else {
        alert("Response not OK");
      }
    } catch (err) {
      alert("Error fetching users");
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
          fetchUsers();
        }
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API}/users/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchUsers();
        }
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="main-content">
      <div className="header-container">
        <h2 className="header-title">Users Data</h2>

        <div className="btns">
          <Link to="/create" className="create-btn">
            Create +
          </Link>

          <button
            className="deleteAll-btn"
            onClick={handleDeleteAll}
            disabled={users.length === 0}
          >
            Delete All
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
                    <Link to={`/read/${user.id}`} className="read">Read</Link>
                    <Link to={`/edit/${user.id}`} className="edit">Edit</Link>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;