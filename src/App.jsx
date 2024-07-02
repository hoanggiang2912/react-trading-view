import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Chart from "./Chart";
import TrendingTicker from "./TrendingTicker";

/**
 * Fetch ticker data from Polygon API
 * Fetch aggregates data from Polygon API for specific ticker
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
        <Route path="/trending-ticker" element={<TrendingTicker />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
