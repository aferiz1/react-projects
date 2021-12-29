import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherDetails from "./WeatherDeatils";

export default function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("mumbai");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=f450afef0b3e4032940070cffcfa0eb0`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { spead } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        spead,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input
            type='search'
            placeholder='type city name...'
            id='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </div>
        <button className='searchButton' onClick={getWeatherInfo}>
          search
        </button>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
}
