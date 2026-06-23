import React, { useEffect, useState } from "react";

function Insight() {
  const [bestSetup, setBestSetup] = useState(null);
  const [bestSession, setBestSession] = useState(null);

  useEffect(() => {
    fetch("http://ai-trading-journal-backend.onrender.com/best_setup")
      .then((response) => response.json())
      .then((data) => {
        setBestSetup(data);
      });

    fetch("http://ai-trading-journal-backend.onrender.com/best-session")
      .then((response) => response.json())
      .then((data) => {
        setBestSession(data);
      });
  }, []);

  return (
    <section className="insights-section">
      <div className="insights-card">

      <h3 className="insights-title">
        AI Insights
      </h3>

      <ul className="insights-list">

        <li>
          Best win rate session:
          {" "}
          {bestSession?.best_session || "Loading..."}
        </li>

        <li>
          Best setup:
          {" "}
          {bestSetup?.best_setup || "Loading..."}
        </li>

        <li>
          Session Win Rate:
          {" "}
          {bestSession?.win_rate || 0}%
        </li>

        <li>
          Setup Win Rate:
          {" "}
          {bestSetup?.win_rate || 0}%
        </li>

      </ul>
      </div>

    </section>
  );
}

export default Insight;
