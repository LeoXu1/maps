import React from 'react';
import "./CityResults.css"

export default class CityResults extends React.Component {

  handleClick(id, lng, lat, cty, st, ct) {
    const info = {
      id: id,
      loc: [lng, lat],
      city: cty,
      stateID: st,
      county: ct,
    }
    this.props.citySelect(info)
    this.props.setInfo(info)
  }

  render() {
    return (
      <div className="resultsList">
        {this.props.cityData.map(cityData => (
          <div
          key={cityData.ID}
          onClick={() => this.handleClick(cityData.ID, cityData.LONGITUDE,
            cityData.LATITUDE, cityData.CITY, cityData.STATE_CODE,
            cityData.COUNTY)}
          className="cityEntry">
            <p>{cityData.CITY}, {cityData.STATE_CODE} ({cityData.COUNTY})</p>
          </div>
        ))}
        <button onClick={this.props.showMore}>Show More</button>
        <button onClick={this.props.showLess}>Show Less</button>
      </div>
    );
  }
}
