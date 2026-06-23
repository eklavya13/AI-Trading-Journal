import React, { useState, useEffect } from "react";

function TradeForm() {
  const [pair, setPair] = useState("");
  const [session, setSession] = useState("");
  const [setup, setSetup] = useState("");
  const [emotion, setEmotion] = useState("");

  const [pairs, setPairs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [setups, setSetups] = useState([]);
  const [emotions, setEmotions] = useState([]);

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
  fetch("https://ai-trading-journal-backend.onrender.com/trade-options")
    .then((res) => res.json())
    .then((data) => {
      setPairs(data.pairs);
      setSessions(data.sessions);
      setSetups(data.setups);
      setEmotions(data.emotions);
    })
    .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tradeData = {
      pair,
      session,
      setup,
      emotion
    };

    try {
      const response = await fetch(
        "https://ai-trading-journal-backend.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tradeData)
        }
      );

      const data = await response.json();

      setPrediction(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <section className="trade-form">
      <div className="trade-form-container">

      <h3 className="trade-form-title">
        AI Trade Predictor
      </h3>
      <form
        className="trade-form-container"
        onSubmit={handleSubmit}
      >

        <select
        className="form-input"
        value={pair}
        onChange={(e) => setPair(e.target.value)}
        >
        <option value="">Pair</option>

        {pairs.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
        </select>
        
        <select
        className="form-input"
        value={session}
        onChange={(e) => setSession(e.target.value)}
        >
        <option value="">Trading Session</option>

        {sessions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
        </select>

        <select
        className="form-input"
        value={setup}
        onChange={(e) => setSetup(e.target.value)}
        >
        <option value="">Setup</option>

        {setups.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
        </select>

        <select
        className="form-input"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        >
        <option value="">Emotion</option>

        {emotions.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
        </select>

        <button
          className="submit-btn"
          type="submit"
        >
          Predict Trade
        </button>

      </form>

      {prediction && (
        <div className="prediction-result">

          <h4>
            Prediction: {prediction.Prediction}
          </h4>

          <p>
            Win Probability:
            {" "}
            {prediction.win_probability}%
          </p>

        </div>
      )}
      </div>

    </section>
  );
}

export default TradeForm;
