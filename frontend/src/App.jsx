import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Read from "./components/Read";
import Edit from "./components/Edit"; 
import './assets/App.css';
import './styles/NavStyle.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="home-nav-btn">Home</Link>
        </nav>

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