import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../API';
import '../styles/HomeStyle.css';
import { FaUserCircle, FaUserEdit, FaTrash, FaFilter, FaSortUp, FaSortDown, FaSortAlphaUp } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import toast from "react-hot-toast";

function Home() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Fetch all users
  async function fetchUsers() {
    try {
      const response = await fetch(`${API}/users`);
      if (!response.ok) throw new Error("Failed to load users");
      const data = await response.json();
      const usersArray = Array.isArray(data) ? data : [];
      setUsers(usersArray);
      setAllUsers(usersArray);
    } catch (err) {
      toast.error("Error fetching users");
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete functions
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`${API}/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("User deleted");
        fetchUsers();
      } else toast.error("Failed to delete user");
    } catch (err) {
      toast.error("Error deleting user");
      console.error(err);
    }
  }

  // Delete all functions
  async function handleDeleteAll() {
    if (!window.confirm("Are you sure you want to delete all users?")) return;
    try {
      const response = await fetch(`${API}/users`, { method: "DELETE" });
      if (response.ok) {
        toast.success("All users deleted");
        fetchUsers();
      } else toast.error("Failed to delete users");
    } catch (err) {
      toast.error("Could not delete users");
      console.error(err);
    }
  }

  // Sorting functions
  const sortAscByID = () => setUsers([...allUsers].sort((a, b) => a.id - b.id));
  const sortDescByID = () => setUsers([...allUsers].sort((a, b) => b.id - a.id));
  const sortAscByName = () => setUsers([...allUsers].sort((a, b) => a.name.localeCompare(b.name)));

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header-container">
          <h2 className="header-title">Users Data</h2>

          <div className="btns">
            <div className="sort-dropdown">
              <button
                className="filter-btn"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <FaFilter />
              </button>

              {showSortMenu && (
                <div className="sort-menu">
                  <button className="sort-option" onClick={() => { sortAscByID(); setShowSortMenu(false); }}>
                    <FaSortUp /> ID ↑
                  </button>
                  <button className="sort-option" onClick={() => { sortDescByID(); setShowSortMenu(false); }}>
                    <FaSortDown /> ID ↓
                  </button>
                  <button className="sort-option" onClick={() => { sortAscByName(); setShowSortMenu(false); }}>
                    <FaSortAlphaUp /> Name A-Z
                  </button>
                </div>
              )}
            </div>

            <Link to="/create" className="create-btn">
              <FaUserPlus />
            </Link>

            <button className="deleteAll-btn" onClick={handleDeleteAll} disabled={users.length === 0}>
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
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.department}</td>
                  <td>
                    <div className="linkBtns">
                      <Link to={`/read/${user.id}`} className="read">
                        <FaUserCircle />
                      </Link>

                      <Link to={`/edit/${user.id}`} className="editHome">
                        <FaUserEdit />
                      </Link>

                      <button className="delete" onClick={() => handleDelete(user.id)}>
                        <FaTrash />
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
