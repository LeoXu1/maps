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
      coords: [-73.9249, 40.6943],
      query: "",
      selectedState: "",
      numResults: 20,
      milOnly: "FALSE",
      city: "New York",
      stateID: "NY",
      county: "New York",
      incorporated: "TRUE",
      military: "FALSE"
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

  handleCheckbox = event => {
    this.setState({
      milOnly: event.target.checked ? "TRUE" : "FALSE"
    });
  }

  setInfo = info => {
    this.setState({
      city: info.city,
      stateID: info.stateID,
      county: info.county,
      incorporated: info.incorporated,
      military: info.military
    })
  }

  render() {
    const isLAorAK = this.state.stateID === "LA" || this.state.stateID === "AK"
    const isLA = this.state.stateID === "LA"
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
            <span>Military?</span>
            <input type="checkbox" name="milOnly" onChange={this.handleCheckbox}/>
          </div>
          <CityResults
          citySelect={this.handleCityClick}
          setInfo={this.setInfo}
          cityData={filterCities(this.state.query,this.state.selectedState,this.state.numResults,
                                this.state.milOnly)}
          />
        </div>
        <div className="container">
          <h1>Map</h1>
          <div className="header">
            <span>{this.state.city}, {this.state.stateID}</span>
            {isLAorAK ? isLA ? (
              <>
              <span>{this.state.county} Parish</span>
              </>
            ) : (
              <>
              <span>{this.state.county} Borough</span>
              </>
            ) : (
              <>
              <span>{this.state.county} County</span>
              </>
            )}
            <span>Incorporated: {this.state.incorporated}</span>
            <span>Military: {this.state.military}</span>
          </div>
          <MapChart coords={this.state.coords}/>
        </div>
      </div>
    );
  }
}
