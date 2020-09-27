import React, { useEffect, useState } from "react";
import { JSC } from "jscharting-react";

import StockList from "./components/StockListComponent/StockList.component";
import SearchBox from "./components/SearchBox/SearchBox.component";
import Stock from "./components/StockComponents/Stock.component";
import Home from "./components/HomeComponent/HomeComponent";

import "./App.css";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/company/:id" component={Stock}></Route>
      </Switch>
    </div>
  );
}

export default App;
