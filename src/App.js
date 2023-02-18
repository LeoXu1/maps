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
      mapStates: true,
      tooltip: "USA",
      defaultTooltip: "USA",
      size: 10,
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
      numResults: 20
    })
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
        selectedCounty: "",
        numResults: 20
      });
    }
    else {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
        numResults: 20
      });
    }
  };

  handleCityClick = loc => {
    if (!this.state.coords.some((l) => l.id === loc.id)) {
      const newCoords = this.state.coords.concat(loc)
      this.setState({
        coords: newCoords,
        defaultTooltip: loc.city + ", " + loc.stateID + " (" + loc.county + ")",
        tooltip: loc.city + ", " + loc.stateID + " (" + loc.county + ")"
      });
      localStorage.setItem("cities", JSON.stringify(newCoords))
    }
  };

  handleMapClick = info => {
    this.setState({
      selectedState: info.state,
      selectedCounty: info.county,
      query: "",
      city: "",
      stateID: "",
      county: "",
      id: "",
      isSelected: false,
      defaultTooltip: "USA"
    });
  }

  handleRemove(id) {
    const newCoords = this.state.coords.filter(cty => cty.id !== id)
    this.setState({
      coords: newCoords,
      isSelected: false,
      defaultTooltip: "USA",
      tooltip: "USA"
    });
    localStorage.setItem("cities", JSON.stringify(newCoords))
  };

  setInfo = info => {
    this.setState({
      city: info.city,
      stateID: info.stateID,
      county: info.county,
      id: info.id,
      isSelected: true,
      defaultTooltip: info.city + ", " + info.stateID + " (" + info.county + ")"
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
      isSelected: false,
      defaultTooltip: "USA",
      tooltip: "USA"
    })
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <div className="header">
            <button>Help</button>
            {this.state.isSelected && <button onClick={() => this.handleRemove(this.state.id)}>Delete</button>}
            <button onClick={()=>this.clear()}>Clear Cities</button>
          </div>
          <div className="header">
            {this.state.mapStates === true ? (
              <button onClick={()=>this.setState({mapStates: !this.state.mapStates})}>Show counties</button>
            ) : (
              <button onClick={()=>this.setState({mapStates: !this.state.mapStates})}>Show states</button>
            )}
            <div className="form">
              <label>Size: </label>
              <input type="range" id="size" value={this.state.size} name="size" min="1" max="20" onChange={this.handleSizeChange}/>
            </div>
          </div>
          <h5>{this.state.tooltip}</h5>
          <div className="mapHolder">
            <MapChart
              coords={this.state.coords}
              setTooltipContent={this.setContent}
              selectCity={this.setInfo}
              size={this.state.size}
              mode={this.state.mapStates}
              selected={this.state.id}
              mapClick={this.handleMapClick}
              defaultTooltip={this.state.defaultTooltip}
            />
          </div>
        </div>
        <div className="spaceBar">
          <input type="text" placeholder="Search city" value={this.state.query} name="query" onChange={this.handleSearchChange}/>
        </div>
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
        </div>
        <button onClick={() => {
          this.setState({
            query: "",
            selectedState: "",
            selectedCounty: "",
            numResults: 20
          })
        }}>Clear Search</button>
        <CityResults
          citySelect={this.handleCityClick}
          setInfo={this.setInfo}
          cityData={filterCities(this.state.query,this.state.selectedState, this.state.selectedCounty,
            this.state.numResults)}
          showMore={() => this.setState({numResults: this.state.numResults + 10})}
        />
      </div>
    );
  }
}
