import React, { useState, useEffect } from "react";

function AddTradeForm() {
  const [pair, setPair] = useState("");
  const [session, setSession] = useState("");
  const [setup, setSetup] = useState("");
  const [emotion, setEmotion] = useState("");

  const [result, setResult] = useState("");
  const [pnl, setPnl] = useState("");

  const [journalEntry, setJournalEntry] = useState("");
  const [lessonsLearned, setLessonsLearned] = useState("");
  const [tradeRating, setTradeRating] = useState("");

  const [pairs, setPairs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [setups, setSetups] = useState([]);
  const [emotions, setEmotions] = useState([]);

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
      emotion,
      result,
      pnl: parseFloat(pnl),
      journal_entry: journalEntry,
      lessons_learned: lessonsLearned,
      trade_rating: parseInt(tradeRating)
    };

    try {
      const response = await fetch(
        "http://ai-trading-journal-backend.onrender.com/add-trade",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tradeData)
        }
      );

      const data = await response.json();

      alert(data.message);

      setPair("");
      setSession("");
      setSetup("");
      setEmotion("");
      setResult("");
      setPnl("");
      setJournalEntry("");
      setLessonsLearned("");
      setTradeRating("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="trade-form">
      <div className="trade-form-container">

        <h3 className="trade-form-title">
          Add Trade
        </h3>

        <form
          className="trade-form-container"
          onSubmit={handleSubmit}
        >

          <input
            list="pair-options"
            className="form-input"
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            placeholder="Pair"
            />

            <datalist id="pair-options">
            {pairs.map((p) => (
                <option key={p} value={p} />
            ))}
            </datalist>

          <select
            className="form-input"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value="">Session</option>
            {sessions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <input
            list="setup-options"
            className="form-input"
            value={setup}
            onChange={(e) => setSetup(e.target.value)}
            placeholder="Setup"
            />

            <datalist id="setup-options">
            {setups.map((s) => (
                <option key={s} value={s} />
            ))}
            </datalist>

          <input
            list="emotion-options"
            className="form-input"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Emotion"
            />

            <datalist id="emotion-options">
            {emotions.map((e) => (
                <option key={e} value={e} />
            ))}
            </datalist>

          <select
            className="form-input"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="">Result</option>
            <option value="WIN">WIN</option>
            <option value="LOSS">LOSS</option>
          </select>

          <input
            className="form-input"
            type="number"
            placeholder="PnL"
            value={pnl}
            onChange={(e) => setPnl(e.target.value)}
          />

          <textarea
            className="form-input"
            placeholder="Journal Entry"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />

          <textarea
            className="form-input"
            placeholder="Lessons Learned"
            value={lessonsLearned}
            onChange={(e) => setLessonsLearned(e.target.value)}
          />

          <input
            className="form-input"
            type="number"
            min="1"
            max="10"
            placeholder="Trade Rating (1-10)"
            value={tradeRating}
            onChange={(e) => setTradeRating(e.target.value)}
          />

          <button
            className="submit-btn"
            type="submit"
          >
            Save Trade
          </button>

        </form>

      </div>
    </section>
  );
}

export default AddTradeForm;
