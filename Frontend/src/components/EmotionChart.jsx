import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend , Cell} from "recharts";

function Emotions() {
  const [emotionData, setEmotionData] = useState([]);

  useEffect(() => {
    fetch("http://ai-trading-journal-backend.onrender.com/emotion-analysis")
      .then((response) => response.json())
      .then((data) => {
        const chartData = Object.entries(data).map(
          ([emotion, count]) => ({
            emotion,
            count
          })
        );

        setEmotionData(chartData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
       const COLORS = [ 
    "#eb9bc3", 
    "#ebb2f7",
    "#9bcff1" ,
    "#95efd1",
    
  ];
  return (
    <section className="emotion-chart">
       <div className="cardss">
      <h3 className="emotion-title">
        Emotions & Performance
      </h3>

      <div className="emotionChart-container">

        <PieChart width={500} height={400}>

          <Pie
            data={emotionData}
            dataKey="count"
            nameKey="emotion"
            cx="50%"
            cy="50%"
            outerRadius={140}
             label
             >
          {emotionData.map((entry, index) => (
            <Cell
            key={index}
          fill={COLORS[index % COLORS.length]}
           />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </div>
       </div>
    </section>
  );
}

export default Emotions;
