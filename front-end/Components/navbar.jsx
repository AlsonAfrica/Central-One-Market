// Navbar.js
import React from 'react';
import "../Styles/navbar.css"
import { FaShoppingCart } from "react-icons/fa";
import logo from "../public/central.png"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar-buttons">
        <button className="navbar-button">Login</button>
        <button className="navbar-button">Cart</button>
        <button className="navbar-button"><FaShoppingCart /></button>
      </div>
    </nav>
  );
}

export default Navbar;
