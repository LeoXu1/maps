import citiesList from "./citiesList.json";

export default function filterCities(searchText, stateSearch, maxResults) {
  if (stateSearch !== "") {
    return citiesList
      .filter(city => {
        if (city.city.toLowerCase().includes(searchText.toLowerCase())
            && city.state_name.toLowerCase() === stateSearch.toLowerCase()) {
          return true;
        }
        return false;
      })
      .slice(0, maxResults);
  }
  else {
    return citiesList
      .filter(city => {
        if (city.city.toLowerCase().includes(searchText.toLowerCase())) {
          return true;
        }
        return false;
      })
      .slice(0, maxResults);
  }

}
