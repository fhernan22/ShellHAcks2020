import React, { useEffect, useState } from "react";
import { JSC } from "jscharting-react";

import StockList from "../StockListComponent/StockList.component";
import SearchBox from "../SearchBox/SearchBox.component";
import Stock from "../StockComponents/Stock.component";

import { Route, Switch } from "react-router-dom";

import "./HomeComponent.scss";

function Home() {
  const [stockList, setStockList] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    fetchAllActiveStocks();
  }, []);

  const fetchAllActiveStocks = () => {
    JSC.fetch("../../../listing_status.csv")
      .then((response) => response.text())
      .then((data) => {
        console.log(JSC.csv2Json(data));
        setStockList(JSC.csv2Json(data));
      });
  };

  const handleChange = (e) => {
    return setSearchField(e.target.value);
  };

  const filteredList = stockList
    .filter((stock) =>
      stock.name.toLowerCase().includes(searchField.toLowerCase())
    )
    .slice(0, 8);

  console.log(searchField);

  return (
    <div className="Home">
      <SearchBox
        handleChange={handleChange}
        placeholder="Search for Any Public Company"
      />
      <StockList filteredList={filteredList} />
    </div>
  );
}

export default Home;
