import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({setTooltipContent, coords, selectCity, size}) => {
  return (
    <>
      <ComposableMap data-tip='' projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke='#aaa'
                  strokeWidth='0.5'
                  geography={geo}
                  fill={"#d6d6d6"}
                />

              ))
            }
          </Geographies>
          {coords.map(({id, loc, city, stateID, county, military}) => (
            <Marker
            key = {id}
            coordinates={loc}
            onMouseEnter={() => {
              const name = city.concat(", ",stateID,)
              const mil = military == "TRUE"
              if (mil){
                setTooltipContent(<div>{name}<br />{county}<br />Military base</div>);
              } else {
                setTooltipContent(<div>{name}<br />{county}</div>);
              }
            }}
            onMouseLeave={() => {
              setTooltipContent("");
            }}
            onClick={() => {
              selectCity({id: id, city: city, stateID: stateID, county: county, military: military});
              setTooltipContent("");
            }}
            style={
            {
              default: {
                opacity: 0.5
              },
              hover: {
                opacity: 1
              }
            }}
            >
            <circle r={size} fill="#0079d3" stroke="#000" strokeWidth={0.5} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
