import React from "react";

function ProductPreview (){
    return(
        <section className="product-preview">

  <h3 className="preview-subtitle">
    Product Preview
  </h3>

  <h2 className="preview-title">
    See TradeSense AI in Action
  </h2>

  <div className="preview-cards-container">

    <div className="preview-card">
      <h3>Total Trades</h3>
      <p>124</p>
    </div>

    <div className="preview-card">
      <h3>Win Rate</h3>
      <p>67%</p>
    </div>

    <div className="preview-card">
      <h3>Profit</h3>
      <p>+$5650</p>
    </div>

  </div>

</section>
    );
}
export default ProductPreview;