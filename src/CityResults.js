import React from 'react';

export default class CityResults extends React.Component {

  render() {
    return (
      <div>
        {this.props.cityData.map(cityData => (
          <div key={cityData.id}>
            <h5>{cityData.city}, {cityData.state_id}</h5>
          </div>
        ))}
      </div>
    );
  }
}
