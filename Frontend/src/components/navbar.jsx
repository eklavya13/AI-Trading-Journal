import { Link } from "react-router-dom";
import React from "react";


function NavBar() {
  return (
    <nav className="navbar">

      <h2 className="logo">
        TradeSense <span>AI</span>
      </h2>
      <ul className="nav-links">
      <li>
        <a href="#features">Features</a>
      </li>
      
      <li>
       <a href="#preview">Preview</a>
      </li>

      <li>
       <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
       <Link to="/analytics">Analytics</Link>
      </li>
      
      </ul>
      <Link to="/loginpage" className="btn">
       Login/Sign-up
      </Link>

    </nav>
  );
}

export default NavBar;