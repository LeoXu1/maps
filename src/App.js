import React from "react";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";
import filterCities from "./filterCities"
import CityResults from "./CityResults"
import allStates from "./allStates.json"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [-149.1091, 61.1508],
      query: "",
      selectedState: "",
      numResults: 20
    };
  }

  handleSearchChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
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
            <input type="text" name="query" onChange={this.handleSearchChange}/>
            <select name="selectedState" onChange={this.handleSearchChange}>
              {allStates.map(state => (
                <option key={state.val}>{state.id}</option>
              ))}
            </select>
            <select name="numResults" onChange={this.handleSearchChange}>
              <option>20</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
            <span>Population</span>
          </div>
          <CityResults
          citySelect={this.handleCityClick}
          cityData={filterCities(this.state.query,this.state.selectedState,this.state.numResults)}
          />
        </div>
        <div className="container">
          <h1>Map</h1>
          <MapChart coords={this.state.coords}/>
        </div>
      </div>
    );
  }
}
