import { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryDetail from "./components/CountryDetail";
import CountryItem from "./components/CountryItem";

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

  const showCountry = (country) => {
    setSearch(country.name.official);
  };

  if (hasExactMatch.length === 1) {
    content = <CountryDetail country={hasExactMatch[0]} />;
  } else if (filteredCountries.length === 1) {
    content = <CountryDetail country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 0) {
    content = (
      <ul>
        {filteredCountries.map((country) => (
          <CountryItem
            country={country}
            showCountry={() => showCountry(country)}
          />
        ))}
      </ul>
    );
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
