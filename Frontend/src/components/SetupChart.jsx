import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function SetupChart (){
  const [setupData, setSetupData] = useState([]);
  useEffect(() => {
  fetch("https://ai-trading-journal-backend.onrender.com/setup-performance")
    .then((res) => res.json())
    .then((data) => {
      setSetupData(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

const CHART_COLORS = [
  "#95efd1",
  "#eb9bc3",
  "#9bcff1",
  "#facc15",
  "#f97316",
  "#8b5cf6",
  "#14b8a6"
];
    return(
        <>
        <section className="setup-analysis">
   <div className="setup">
  <h3 className="setup-analysis-title">
    Setup Performance
  </h3>

  <div className="setup-chart-container">
    <PieChart width={500} height={400}>
      <Pie
      data={setupData}
      dataKey="winRate"
      nameKey="setup"
      cx="50%"
      cy="50%"
      outerRadius={140}
      label
    >
      {setupData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={CHART_COLORS[index % CHART_COLORS.length]}
        />
      ))}
  </Pie>

  <Tooltip
    contentStyle={{
      backgroundColor: "#361f81",
      border: "1px solid rgba(99,102,241,0.4)",
      borderRadius: "10px",
      color: "#f9f9f9"
    }}
  />

  <Legend />
</PieChart>

  </div>
</div>
</section>        
        </>
    );
}
export default SetupChart;
