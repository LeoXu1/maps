import React from "react";
import './App.css';
import "./styles.css";
import MapChart from "./MapChart";
import filterCities from "./filterCities"
import CityResults from "./CityResults"
import allStates from "./data/allStates.json"
import countiesList from "./data/countiesList"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "states",
      tooltip: "Mouse over a state, county, or city.",
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
    if (event.target.value === "Select state") {
      this.setState({
        selectedState: "",
        selectedCounty: ""
      })
    }
    else {
      this.setState({
        selectedState: event.target.value,
        selectedCounty: ""
      })
    }
  }

  handleSearchChange = event => {
    if (event.target.name === "selectedCounty" && event.target.value === "Select county") {
      this.setState({
        ...this.state,
        selectedCounty: ""
      });
    }
    else {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    }
  };

  handleCityClick = loc => {
    if (!this.state.coords.some((l) => l.id === loc.id)) {
      const newCoords = this.state.coords.concat(loc)
      this.setState({
        coords: newCoords,
      });
      localStorage.setItem("cities", JSON.stringify(newCoords))
    }
  };

  handleMapClick = info => {
    this.setState({
      selectedState: info.state,
      selectedCounty: info.county,
      query: ""
    });
  }

  handleRemove(id) {
    const newCoords = this.state.coords.filter(cty => cty.id !== id)
    this.setState({
      coords: newCoords,
      isSelected: false
    });
    localStorage.setItem("cities", JSON.stringify(newCoords))
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

  clearSearch() {
    this.setState({
      query: "",
      selectedState: "",
      selectedCounty: ""
    })
  }

  render() {
    return (
      <div className="base">
        <div className="container">
          <div className="header">
            <select name="selectedState" value={this.state.selectedState} onChange={this.handleStateChange}>
              {allStates.map(state => (
                <option key={state.val}>{state.id}</option>
              ))}
            </select>
            {this.state.selectedState === "" ? (
              null
            ) : (
              <>
                <select name="selectedCounty" value={this.state.selectedCounty} onChange={this.handleSearchChange}>
                  {countiesList.filter(county => county.state_name === this.state.selectedState)
                    .map(county => (
                    <option key={county.fips}>{county.county_name}</option>
                  ))}
                </select>
              </>
            )}
            <input type="text" placeholder="Search city" value={this.state.query} name="query" onChange={this.handleSearchChange}/>
            <input type="number" step={10} value={this.state.numResults} name="numResults" onChange={this.handleSearchChange} />
          </div>
          <div className="header">
            <button onClick={()=>this.clearSearch()}>Clear Search</button>
          </div>
          <CityResults
          citySelect={this.handleCityClick}
          setInfo={this.setInfo}
          cityData={filterCities(this.state.query,this.state.selectedState, this.state.selectedCounty,
            this.state.numResults)}
          />
        </div>
        <div className="container">
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
                  <input type="range" id="size" value={this.state.size} name="size" min="1" max="20" onChange={this.handleSizeChange}/>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="header">
                <select name="mode" onChange={this.handleSearchChange}>
                  <option>states</option>
                  <option>counties</option>
                </select>
                <div className="form">
                  <label for="size">Size: </label>
                  <input type="range" id="size" value={this.state.size} name="size" min="1" max="20" onChange={this.handleSizeChange}/>
                </div>
              </div>
            </>
          )}
          <div className="header">
            <h5>{this.state.tooltip}</h5>
            <button onClick={()=>this.clear()}>Clear Cities</button>
          </div>
          <MapChart
            coords={this.state.coords}
            setTooltipContent={this.setContent}
            selectCity={this.setInfo}
            size={this.state.size}
            mode={this.state.mode}
            selected={this.state.id}
            mapClick={this.handleMapClick}
          />
        </div>
      </div>
    );
  }
}
