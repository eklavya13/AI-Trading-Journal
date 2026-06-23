import React, { useEffect, useState } from "react";

function TradeTable() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetch("http://ai-trading-journal-backend.onrender.com/recent-trades")
      .then((response) => response.json())
      .then((data) => {
        console.log("Recent Trades:", data);
        setTrades(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="trade-table">
      <h3 className="trade-title">
        Recent Trades
      </h3>

      <table className="trades-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Setup</th>
            <th>Session</th>
            <th>Result</th>
            <th>Emotion</th>
            <th>PnL</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade, index) => (
            <tr
              key={index}
              className="trade-row"
            >
              <td>{trade.pair}</td>
              <td>{trade.setup}</td>
              <td>{trade.session}</td>
              <td
             className={
              trade.result === "WIN"
               ? "win"
               : "loss"
               }
               >
               {trade.result}
              </td>
              <td>{trade.emotion}</td>
              <td
                 className={
                 trade.pnl > 0
               ? "profit"
               : "negative"
               }
              >
                 {trade.pnl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TradeTable;
