import axios from "axios"
import { useState, useEffect } from "react"

const Weather = ({city}) =>{
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    //console.log(city[0])
    useEffect(() =>{
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&APPID=${api_key}&units=metric`)
        .then(response=>{
          setWeather(response.data)
          //console.log('weather',weather)
        },)
    },[])
    return(
    weather.length !== 0?(
    <div><h2>Weather in {city}</h2>
    Tempererature {weather.main.temp} Celsius<br/>
    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/> <br/>
    Wind {weather.wind.speed} m/s
    
    </div>
    ):<div>ERROR in retrieving weather</div>)
  }

  export default Weather