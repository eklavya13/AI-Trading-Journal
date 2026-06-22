import { Link } from "react-router-dom";
import React from "react";
import Hero3 from '../assets/Hero3.jpeg';

function Hero() {
  return (
    
      <section
  className="hero">
  <div className="hero-content">

    <h1>
      TRADE.
      <br />
      LEARN.
      <br />
      <span>CONQUER.</span>
    </h1>

    <p>
      Track every trade, analyze performance,
      and improve with AI-powered insights.
    </p>

    <div className="hero-buttons">
      <Link to="/dashboard" className="hero-btn">
         View Dashboard
      </Link>

      <Link to="/addtrade" className="hero-btn-secondary">
        Start Trading
      </Link>
    </div>

  </div>
</section>
  );
}
export default Hero;

