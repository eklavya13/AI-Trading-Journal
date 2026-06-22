import React from "react";
import TradeForm from "../components/TradeForm";
import AddTradeForm from "../components/AddTradeForm";

function AddTrade() {
  return (
    <section className="add-trade-page">
      <TradeForm />
      <AddTradeForm />
    </section>
  );
}
export default AddTrade;