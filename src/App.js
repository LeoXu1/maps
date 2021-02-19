import React from "react";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";
import filterCities from "./filterCities"
import CityResults from "./CityResults"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: filterCities("", 20),
      coords: [-149.1091, 61.1508],
      content: ""
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredCities: filterCities(event.target.value, 20)
    });
  };


  handleCityClick = loc => {
    this.setState({
      coords: loc
    });
  };


  render() {
    return (
      <div className="base">
        <div className="container">
          <h1>Search</h1>
          <div className="header">
            <input type="text" onChange={this.handleSearchChange}/>
            <span>Population</span>
          </div>
          <CityResults citySelect={this.handleCityClick} cityData={this.state.filteredCities} />
        </div>
        <div className="container">
          <h1>Map</h1>
          <MapChart coords={this.state.coords}/>
        </div>
      </div>
    );
  }
}
