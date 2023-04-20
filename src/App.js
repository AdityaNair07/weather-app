import "./App.css";
import axios from "axios";
import { useState } from "react";
import weather1 from "./images/weather1.png";

function App() {
  const apiKey = "196b70161aa143d2b34153020231904 ";
  const [data, setdata] = useState({});
  const [inputCity, setinputCity] = useState("");
  const getWeatherDetails = (city) => {
    if (!city) return;
    const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;
    axios
      .get(apiURL)
      .then((res) => {
        setdata(res.data);
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  const handleChange = (e) => {
    setinputCity(e.target.value);
  };
  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Weather Application</h1>
        <img
          src={weather1}
          alt="WeatherIcon"
          style={{ width: "100px", padding: "10px" }}
        />
      </div>
      <div className="main">
        <input
          type="text"
          className="searchbar"
          onChange={handleChange}
          value={inputCity}
          placeholder="Enter place name.."
        />
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {Object.keys(data).length > 0 && (
        <div className="weatherResult">
          <table cellSpacing={10}>
            <tr>
              <td>City:</td>
              <td>{data.location.name}</td>
            </tr>
            <tr>
              <td>Day: </td>
              <td>{data.current.condition.text}</td>
            </tr>
            <tr>
              <td>Current Temp: </td>
              <td>{data.current.temp_c}</td>
            </tr>
            <tr>
              <td>Max Temp: </td>
              <td>{data.forecast.forecastday[0].day.maxtemp_c}°C</td>
            </tr>
            <tr>
              <td>Min Temp: </td>
              <td>{data.forecast.forecastday[0].day.mintemp_c}°C</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
