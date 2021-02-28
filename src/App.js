import React from "react";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";
import filterCities from "./filterCities"
import CityResults from "./CityResults"
import allStates from "./allStates.json"
import ReactTooltip from "react-tooltip";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: "",
      size: 3,
      coords: [],
      query: "",
      selectedState: "",
      numResults: 20,
      milOnly: "FALSE",
      city: "New York",
      stateID: "NY",
      county: "New York",
      id: "",
      military: "FALSE",
      isSelected: false
    };
  }

  handleSearchChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleCityClick = loc => {
    const newCoords = this.state.coords.concat(loc)
    this.setState({
      coords: newCoords,
    });
  };

  handleRemove(id) {
    const newCoords = this.state.coords.filter(cty => cty.id !== id)
    this.setState({
      coords: newCoords,
      isSelected: false
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
      id: info.id,
      military: info.military,
      isSelected: true
    })
  }

  setContent = content => {
    this.setState({
      tooltip: content
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
          {this.state.isSelected ? (
            <>
              <div className="header">
                <button onClick={() => this.handleRemove(this.state.id)}>Delete</button>
                <div className="form">
                  <label for="size">
                    Size:
                  </label>
                  <input type="number" value={this.state.size} name="size" onChange={this.handleSearchChange}/>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="header">
                <span>No city selected</span>
                <div className="form">
                  <label for="size">
                    Size:
                  </label>
                  <input type="number" value={this.state.size} name="size" onChange={this.handleSearchChange}/>
                </div>
              </div>
            </>
          )}
          <MapChart
          coords={this.state.coords}
          setTooltipContent={this.setContent}
          selectCity={this.setInfo}
          size={this.state.size}
          />
          <ReactTooltip multiline={true}>{this.state.tooltip}</ReactTooltip>
        </div>
      </div>
    );
  }
}
