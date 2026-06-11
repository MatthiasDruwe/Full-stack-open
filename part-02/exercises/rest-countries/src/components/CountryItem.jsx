const CountryItem = ({ country, showCountry }) => {
  return (
    <li key={country.name.official}>
      {country.name.official}&nbsp;
      <button onClick={showCountry}>show</button>
    </li>
  );
};

export default CountryItem;
