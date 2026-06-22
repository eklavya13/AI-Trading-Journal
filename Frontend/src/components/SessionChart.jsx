import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import React, { useState, useEffect } from "react";

function SessionChart() {

   const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.7:8000/session-performance")
      .then((res) => res.json())
      .then((data) => setSessionData(data))
      .catch((err) => console.error(err));
  }, []);

  const COLORS = [
    "#95efd1", 
    "#eb9bc3", 
    "#9bcff1" 
  ];

  return (
    <section className="session-chart">

      <h3 className="session-chart-title">
        Session Performance
      </h3>

      <div className="session-chart-container">

        <PieChart width={1000} height={400}>

          <Pie
            data={sessionData}
            dataKey="profit"
            nameKey="session"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label={({ name, value }) =>
              `${name}: $${value}`
            }
          >
            {sessionData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </div>

    </section>
  );
}

export default SessionChart;