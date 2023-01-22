import citiesList from "./data/citiesList.json";

export default function filterCities(searchText, stateSearch, countySearch, maxResults) {
  if (stateSearch !== "") {
    if (countySearch !== "") {
      return citiesList
        .filter(city => {
          if (city.CITY.toLowerCase().includes(searchText.toLowerCase())
              && city.STATE_NAME.toLowerCase() === stateSearch.toLowerCase()
              && countySearch.toLowerCase().includes(city.COUNTY.toLowerCase())) {
            return true;
          }
          return false;
        })
        .slice(0, maxResults);
    }
    else {
      return citiesList
        .filter(city => {
          if (city.CITY.toLowerCase().includes(searchText.toLowerCase())
              && city.STATE_NAME.toLowerCase() === stateSearch.toLowerCase()) {
            return true;
          }
          return false;
        })
        .slice(0, maxResults);
    }

  }
  else {
    return citiesList
      .filter(city => {
        if (city.CITY.toLowerCase().includes(searchText.toLowerCase())) {
          return true;
        }
        return false;
      })
      .slice(0, maxResults);
  }

}
