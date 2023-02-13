import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const MapChart = ({setTooltipContent,
  coords, selectCity, size, mode, selected, mapClick}) => {
  var geoUrl = "https://raw.githubusercontent.com/LeoXu1/counties-with-states-topojson/main/"
  if (mode === true) {
    geoUrl = geoUrl + "statesTopoJson.json";
  }
  else {
    geoUrl = geoUrl + "countiesTopoJson.json";
  }
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
                  onMouseEnter={() => {
                    if (mode === "counties") {
                      setTooltipContent(geo.properties.name+", "+geo.properties.state);
                    }
                    else {
                      setTooltipContent(geo.properties.name);
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("USA");
                  }}
                  onClick={() => {
                    if (mode === "counties") {
                      const info = {
                        state: geo.properties.state,
                        county: geo.properties.name,
                      }
                      mapClick(info)
                    }
                    else {
                      const info = {
                        state: geo.properties.name,
                        county: "",
                      }
                      mapClick(info)
                    }
                  }}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill:"#949494" },
                    pressed: { outline: "none" },
                  }}
                />

              ))
            }
          </Geographies>
          {coords.map(({id, loc, city, stateID, county}) => (
            <Marker
            key = {id}
            coordinates={loc}
            onMouseEnter={() => {
              const name = city.concat(", ",stateID)
              setTooltipContent(<div>{name} ({county})</div>);
            }}
            onMouseLeave={() => {
              setTooltipContent("USA");
            }}
            onClick={() => {
              selectCity({id: id, city: city, stateID: stateID, county: county});
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
            {id === selected ?
              <circle r={size} fill="#FFD700" stroke="#000" strokeWidth={0.1} /> :
              <circle r={size} fill="#0079d3" stroke="#000" strokeWidth={0.1} />

            }

            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
