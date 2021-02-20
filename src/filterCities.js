import citiesList from "./citiesList.json";

export default function filterCities(searchText, stateSearch, maxResults) {
  return citiesList
    .filter(city => {
      if (city.city.toLowerCase().includes(searchText.toLowerCase())
          && city.state_name.toLowerCase().includes(stateSearch.toLowerCase())) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}
