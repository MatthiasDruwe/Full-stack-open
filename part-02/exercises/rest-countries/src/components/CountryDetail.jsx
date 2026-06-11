import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.latlng[0], country.latlng[1])
      .then((response) => {
        setWeather(response)
      })
  }, [])

  return (
    <>
      <h1>{country.name.official}</h1>
      <p>Capital {country.capital.toString()}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />
      {weather && (
        <>
          <h2>Weather in {country.name.official}</h2>
          <p>Temperature {weather.main.temp}°C </p>
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default CountryDetail
