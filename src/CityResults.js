import React from 'react';
import "./CityResults.css"

export default class CityResults extends React.Component {

  handleClick(id, lng, lat, cty, st, ct, inc, mil) {
    const loc = {
      id: id,
      loc: [lng, lat],
      city: cty,
      stateID: st
    }
    const info = {
      city: cty,
      stateID: st,
      county: ct,
      incorporated: inc,
      military: mil
    }
    this.props.citySelect(loc)
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
            cityData.county_name, cityData.incorporated, cityData.military)}
          className="cityEntry">
            <h5>{cityData.city}, {cityData.state_id}</h5>
            <h5>{cityData.population}</h5>
          </div>
        ))}
      </div>
    );
  }
}
