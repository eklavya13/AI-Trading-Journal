import React, { useState, useEffect } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis, ZAxis, Cell } from "recharts";

function SessionAnalytics(){
  const [sessionData, setSessionData] = useState([]);
  useEffect(() => {
  fetch("http://192.168.1.7:8000/session-performance")
    .then((res) => res.json())
    .then((data) => {
      setSessionData(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

const CHART_COLORS = [
  "#e24091", // Soft Pink
  "#9bcff1"  // Light Blue
];
return(
    <>
    <section className="session-analysis">
      <div className="sessions">
        <h3 className="session-analysis-title">
            Session Analysis
        </h3>
        <div className="session-analysis-container">
            <BarChart
  width={500}
  height={400}
  data={sessionData}
>
  <XAxis
    dataKey="session"
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
      color: "#F8FAFC"
    }}
  />

  <Bar
    dataKey="profit"
    fill="#eb9bc3"
  />

  <Bar
    dataKey="winRate"
    fill="#9bcff1"
  />

</BarChart>

        </div>
         </div>
    </section> 
    </>
);
}
export default SessionAnalytics;