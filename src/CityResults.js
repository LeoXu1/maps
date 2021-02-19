import React from 'react';
import "./CityResults.css"

export default class CityResults extends React.Component {

  handleClick(lng, lat) {
    const loc = [lng, lat]
    this.props.citySelect(loc)
  }

  render() {
    return (
      <div className="resultsList">
        {this.props.cityData.map(cityData => (
          <div
          key={cityData.id}
          onClick={() => this.handleClick(cityData.lng, cityData.lat)}
          className="cityEntry">
            <h5>{cityData.city}, {cityData.state_id}</h5>
            <h5>{cityData.population}</h5>
          </div>
        ))}
      </div>
    );
  }
}
