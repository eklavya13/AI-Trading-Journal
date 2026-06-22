import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import EquityChart from "../components/EquityChart";
import TradeTable from "../components/TradeTable";
import SessionChart from "../components/SessionChart";

function Dashboard() {
  const [stats, setStats] = useState({
    total_trades: 0,
    total_pnl: 0,
    win_rate: 0,
  });

  useEffect(() => {
    fetch("http://192.168.1.7:8000/analytics")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStats(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const statCards = [
    {
      title: "Total Trades",
      value: stats.total_trades,
    },
    {
      title: "Win Rate",
      value: `${stats.win_rate}%`,
    },
    {
      title: "Profit",
      value: `$${stats.total_pnl}`,
    },
  ];

  return (
    <section className="dashboard">
      <h2 className="dashboard-title">
        Dashboard
      </h2>

      <div className="stats-container">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <div className="dashboard-chart-section">
        <EquityChart />
      </div>

      <TradeTable />

      <SessionChart />
    </section>
  );
}

export default Dashboard;