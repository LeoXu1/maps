import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";
import filterCities from "./filterCities"
import CityResults from "./CityResults"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: filterCities("", 20)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredCities: filterCities(event.target.value, 20)
    });
  };

  render() {
    return (
      <div class="base">
        <div class="container">
          <h1>Search</h1>
          <input type="text" onChange={this.handleSearchChange}/>
          <CityResults cityData={this.state.filteredCities} />
        </div>
        <div class="container">
          <h1>Map</h1>
          <MapChart />
        </div>
      </div>
    );
  }
}
