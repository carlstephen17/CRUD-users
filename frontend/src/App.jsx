import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 
import Home from "./components/Home";
import Create from "./components/Create";
import Read from "./components/Read";
import Edit from "./components/Edit";
import { FaHome } from "react-icons/fa";
import './styles/AppStyle.css';
import './styles/HomeStyle.css';

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      
      <div className="app-container">
        <div className="top-nav">
          <nav className="navbar">
            <Link to="/" className="home-nav-btn">
              <FaHome style={{ fontSize: "2rem", color: "white" }} />
              <span style={{ color: "white" }}>Home</span>
            </Link>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;