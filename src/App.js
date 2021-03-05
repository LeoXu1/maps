import React from "react";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";
import filterCities from "./filterCities"
import CityResults from "./CityResults"
import allStates from "./allStates.json"
import countiesList from "./countiesList"
import ReactTooltip from "react-tooltip";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "states",
      tooltip: "",
      size: 3,
      coords: [],
      query: "",
      selectedState: "",
      selectedCounty: "",
      numResults: 20,
      city: "New York",
      stateID: "NY",
      county: "New York",
      id: "",
      isSelected: false
    };
  }

  componentDidMount() {
    if (!localStorage) {
      this.setState({
        coords: []
      })
    }
    else {
      try {
        const cities = localStorage.getItem('cities') || ''
        this.setState({
          coords: JSON.parse(cities)
        })
      }
      catch (err) {
        this.setState({
          coords: []
        })
      }

    }

  }

  handleSizeChange = event => {
    this.setState({
      size: event.target.value
    })
  }

  handleStateChange = event => {
    this.setState({
      selectedState: event.target.value,
      selectedCounty: ""
    })
  }

  handleSearchChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleCityClick = loc => {
    if (!this.state.coords.some((l) => l.id === loc.id)) {
      const newCoords = this.state.coords.concat(loc)
      this.setState({
        coords: newCoords,
      });
    }
  };

  handleRemove(id) {
    const newCoords = this.state.coords.filter(cty => cty.id !== id)
    this.setState({
      coords: newCoords,
      isSelected: false
    });
  };

  setInfo = info => {
    this.setState({
      city: info.city,
      stateID: info.stateID,
      county: info.county,
      id: info.id,
      isSelected: true
    });
  }

  setContent = content => {
    this.setState({
      tooltip: content
    })
  }

  clear() {
    localStorage.removeItem("cities");
    this.setState({
      coords: [],
      isSelected: false
    })
  }

  save() {
    localStorage.setItem("cities", JSON.stringify(this.state.coords))
  }

  render() {
    return (
      <div className="base">
        <div className="container">
          <h1>Search</h1>
          <div className="header">
            <div className="form">
              <label>City: </label>
              <input type="text" name="query" onChange={this.handleSearchChange}/>
            </div>
            <div className="form">
              <label>State:</label>
              <select name="selectedState" onChange={this.handleStateChange}>
                {allStates.map(state => (
                  <option key={state.val}>{state.id}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="header">
            <div className="form">
              <label>County: </label>
              <select name="selectedCounty" onChange={this.handleSearchChange}>
                {countiesList.filter(county => county.state_name === this.state.selectedState)
                  .map(county => (
                  <option key={county.fips}>{county.county_name}</option>
                ))}
              </select>
            </div>
            <div className="form">
              <label>Results: </label>
              <select name="numResults" onChange={this.handleSearchChange}>
                <option>20</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className="header">
            <button onClick={()=>this.clear()}>Clear</button>
            <button onClick={()=>this.save()}>Save</button>
          </div>
          <CityResults
          citySelect={this.handleCityClick}
          setInfo={this.setInfo}
          cityData={filterCities(this.state.query,this.state.selectedState, this.state.selectedCounty,
            this.state.numResults)}
          />
        </div>
        <div className="container">
        <h1>Map</h1>
          {this.state.isSelected ? (
            <>
              <div className="header">
                <span>{this.state.city}, {this.state.stateID}</span>
                <select name="mode" onChange={this.handleSearchChange}>
                  <option>states</option>
                  <option>counties</option>
                </select>
                <button onClick={() => this.handleRemove(this.state.id)}>Delete</button>
                <div className="form">
                  <label>Size: </label>
                  <input type="number" value={this.state.size} name="size" onChange={this.handleSizeChange}/>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="header">
                <span>No city selected</span>
                <select name="mode" onChange={this.handleSearchChange}>
                  <option>states</option>
                  <option>counties</option>
                </select>
                <div className="form">
                  <label>Size: </label>
                  <input type="number" value={this.state.size} name="size" onChange={this.handleSizeChange}/>
                </div>
              </div>
            </>
          )}
          <MapChart
          coords={this.state.coords}
          setTooltipContent={this.setContent}
          selectCity={this.setInfo}
          size={this.state.size}
          mode={this.state.mode}
          selected={this.state.id}
          />
          <ReactTooltip multiline={true}>{this.state.tooltip}</ReactTooltip>
        </div>
      </div>
    );
  }
}
