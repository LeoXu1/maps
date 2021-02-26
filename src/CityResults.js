import React from 'react';
import "./CityResults.css"

export default class CityResults extends React.Component {

  handleClick(id, lng, lat, cty, st, ct, military) {
    const info = {
      id: id,
      loc: [lng, lat],
      city: cty,
      stateID: st,
      county: ct,
      military: military
    }
    this.props.citySelect(info)
    this.props.setInfo(info)
  }

  render() {
    return (
      <div className="resultsList">
        {this.props.cityData.map(cityData => (
          <div
          key={cityData.id}
          onClick={() => this.handleClick(cityData.id, cityData.lng,
            cityData.lat, cityData.city, cityData.state_id,
            cityData.county_name, cityData.military)}
          className="cityEntry">
            <h5>{cityData.city}, {cityData.state_id}</h5>
            <h5>{cityData.population}</h5>
          </div>
        ))}
      </div>
    );
  }
}
