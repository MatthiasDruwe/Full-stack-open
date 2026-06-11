import axios from 'axios'

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_WEATHER_API}` 

const getWeather = (lat, long) => {
    const request = axios.get(`${baseUrl}&lat=${lat}&lon=${long}&units=metric`)
   
    return request.then(response => response.data)
}

export default {getWeather}