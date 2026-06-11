const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.official}>{country.name.official}</li>
      ))}
    </ul>
  );
};

export default CountryList;
