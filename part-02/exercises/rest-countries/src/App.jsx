import { useEffect, useState } from "react";
import countryService from "./services/countries";
import NoMatch from "./components/NoMatch";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(search.toLowerCase()) ||
      country.name.official.toLowerCase().includes(search.toLowerCase())
    );
  });

  const hasExactMatch = countries.filter((country) => {
    return (
      country.name.common.toLowerCase() === search.toLowerCase() ||
      country.name.official.toLowerCase() === search.toLowerCase()
    );
  });

  let content;

  if (hasExactMatch.length === 1) {
    content = <Country country={hasExactMatch[0]} />;
  } else if (filteredCountries.length === 1) {
    content = <Country country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 10) {
    content = <NoMatch />;
  } else if (filteredCountries.length > 0) {
    content = <CountryList countries={filteredCountries} />;
  } else {
    content = <p>No Country found</p>;
  }

  return (
    <div>
      <form>
        <label>find countries: </label>
        <input value={search} onChange={handleSearch} />
      </form>
      {content}
    </div>
  );
}

export default App;
