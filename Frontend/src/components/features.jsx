import React from "react";

function Features() {

  const features = [
    {
      title: "AI Insights",
      description: "Predict trade outcomes using machine learning."
    },
    {
      title: "Performance Analytics",
      description: "Track win rate, profit and trading sessions."
    },
    {
      title: "Emotion Tracking",
      description: "Understand how emotions affect performance."
    },
    {
      title: "Smart Journaling",
      description: "Store and review every trade in one place."
    }
  ];

  return (
    <section className="features">
      <p className="section-tag">Features</p>
        <h2 className="features-title">
          Everything You Need
          <br />
         to Become a Better Trader
         </h2>

      <div className="features-container">

        {features.map((feature) => (
          <div
            className="feature-card"
            key={feature.title}
          >

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;