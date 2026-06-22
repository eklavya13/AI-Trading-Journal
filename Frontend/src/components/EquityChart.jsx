import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EquityChart() {
  const data = [
    { day: "Mon", equity: 100 },
    { day: "Tue", equity: 120 },
    { day: "Wed", equity: 90 },
    { day: "Thu", equity: 150 },
    { day: "Fri", equity: 200 },
  ];

  return (
    <section className="equity-chart">
      <h3 className="chart-title">Account Growth</h3>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              {/* Gradient Fill */}
              <linearGradient
                id="equityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#95efd1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#95efd1" stopOpacity={0} />
              </linearGradient>

              {/* Glow Effect */}
              <filter id="glow">
                <feGaussianBlur
                  stdDeviation="4"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="equity"
              stroke="#95efd1"
              strokeWidth={3}
              fill="url(#equityGradient)"
              filter="url(#glow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default EquityChart;