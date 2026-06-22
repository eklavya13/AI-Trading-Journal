import React, { useState, useEffect } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

function SetupChart (){
  const [setupData, setSetupData] = useState([]);
  useEffect(() => {
  fetch("http://192.168.1.7:8000/setup-performance")
    .then((res) => res.json())
    .then((data) => {
      setSetupData(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

const CHART_COLORS = [
  "#95efd1", // Mint Green
  "#eb9bc3", // Soft Pink
  "#9bcff1"  // Light Blue
];
    return(
        <>
        <section className="setup-analysis">
   <div className="setup">
  <h3 className="setup-analysis-title">
    Setup Performance
  </h3>

  <div className="setup-chart-container">
    <BarChart width={500} height={400} data={setupData}>
        <XAxis
         dataKey="setup"
         tick={{ fill: "#F8FAFC", fontSize: 14 }}
         axisLine={{ stroke: "#CBD5E1" }}
         tickLine={{ stroke: "#CBD5E1" }}
        />
        <YAxis
          tick={{ fill: "#F8FAFC", fontSize: 14 }}
          axisLine={{ stroke: "#CBD5E1" }}
         tickLine={{ stroke: "#CBD5E1" }}
       />
        <Tooltip 
        contentStyle={{
        backgroundColor: "#361f81",
         border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: "10px",
       color: "#f9f9f9"
        }}/>
        <Bar dataKey="winRate"
        fill="#9bcff1"/>

    </BarChart>

  </div>
</div>
</section>        
        </>
    );
}
export default SetupChart;