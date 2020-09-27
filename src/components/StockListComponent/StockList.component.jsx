import React, { useEffect, useState } from "react";
import { JSC } from "jscharting-react";

import "./StockList.styles.scss";

import StockPreview from "../StockPreview/StockPreview.component";

function StockList({ filteredList }) {
  return (
    <div className="stock-list">
      {filteredList.map((stock) => (
        <StockPreview
          key={stock.symbol}
          name={stock.name}
          symbol={stock.symbol}
          exchange={stock.exchange}
        />
      ))}
    </div>
  );
}

export default StockList;
