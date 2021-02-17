import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <h1>Map</h1>
      <div class="container">
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
}

export default App;
