import citiesList from "./citiesList.json";

export default function filterCities(searchText, maxResults) {
  return citiesList
    .filter(city => {
      if (city.city.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}
