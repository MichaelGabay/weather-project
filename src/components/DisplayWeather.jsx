import React, { useState, useEffect } from "react";
import { BiCircle } from "react-icons/bi";
import { getDayName } from "../utils/utils";
import ForecastComponent from "./ForecastComponent";
import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import Loading from "./Loading";
import { toast } from "react-toastify";

const DisplayWeather = ({ weather, showCOrF }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [hoursForecast, setHoursForecast] = useState([]);
  const [daysForecast, setDaysForecast] = useState([]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (Object.keys(weather).length != 0) {
      updateForecastHours();
      updateDaysForecast();
    }
  }, [weather]);

  const updateForecastHours = () => {
    const {
      forecast: {
        forecastday: [{ hour: hours }],
      },
    } = weather;
    const d = new Date();
    const dateFormat = `${d.getFullYear()}-${
      d.getMonth() > 9 ? d.getMonth() : "0" + (d.getMonth() + 1)
    }-${d.getDate()} ${d.toLocaleTimeString().substring(0, 5)}`;
    // remove all the hours before current time
    let hoursFilter = hours.filter(({ time }) => time > dateFormat);
    hoursFilter = hoursFilter.slice(0, 5);
    // if we close to 00:00
    if (hoursFilter.length < 5) {
      // taking the hours from the next day
      const {
        forecast: {
          forecastday: [_, { hour: nextDayHours }],
        },
      } = weather;
      hoursFilter = [
        ...hoursFilter,
        ...nextDayHours.slice(0, 5 - hoursFilter.length),
      ];
    }
    hoursFilter.forEach((hour) => {
      hour["time"] = hour.time.substring(11, hour.time.length);
    });
    setHoursForecast(hoursFilter);
  };

  const updateDaysForecast = () => {
    let {
      forecast: { forecastday: forecastdays },
    } = weather;
    forecastdays = forecastdays.slice(1, forecastdays.length);
    forecastdays.forEach((day) => {
      day["date"] = getDayName(day.date);
    });
    setDaysForecast(forecastdays);
  };
  const addToFavorite = () => {
    toast.success("place added");
    const fav = [...favorites];
    fav.push({
      place: weather.location.name + ", " + weather.location.country,
      temp: weather.current.temp_c,
      condotionText: weather.current.condition.text,
      icon: weather.current.condition.icon,
    });
    setFavorites(fav);
  };
  const removeFromFavorite = () => {
    toast.done("place remmoved");
    setFavorites(
      favorites.filter(
        (fav) =>
          fav.place != weather.location.name + ", " + weather.location.country
      )
    );
  };

  if (Object.keys(weather).length == 0) return <Loading />;

  return (
    <div className="text-white">
      <div className="text-center">
        <div className="flex items-center mt-7 justify-center">
          <p className="text-2xl m-0">
            {weather.location.name}, {weather.location.country}
          </p>
          {favorites.find(
            (fav) =>
              fav.place ==
              weather.location.name + ", " + weather.location.country
          ) ? (
            <AiTwotoneStar
              onClick={removeFromFavorite}
              className="ms-3"
              cursor="pointer"
              size={30}
            />
          ) : (
            <AiOutlineStar
              onClick={addToFavorite}
              className="ms-3"
              cursor="pointer"
              size={30}
            />
          )}
        </div>
        <p className="mt-2 text-lg text-sky-300">
          {weather.current.condition.text}
        </p>
      </div>
      <div className="flex justify-evenly items-center ">
        <img className="w-20" src={weather.current.condition.icon} />
        <div className="flex">
          <p className="text-4xl ">
            {showCOrF ? weather.current.temp_c : weather.current.temp_f}
          </p>
          <BiCircle size={12} />
        </div>
      </div>
      <p className="text-center lg:text-start">HOURLY FORECAST</p>
      <div className="h-[0.7px] bg-white my-3"></div>
      <div className="flex flex-row items-center justify-between">
        {hoursForecast.map(({ time, condition, temp_c, temp_f }) => (
          <ForecastComponent
            key={time}
            title={time}
            icon={condition.icon}
            temp={showCOrF ? temp_c : temp_f}
          />
        ))}
      </div>
      <p className="text-center lg:text-start mt-10">DAILY FORECAST</p>
      <div className="h-[0.7px] bg-white my-3"></div>
      <div className="flex flex-row items-center justify-between">
        {daysForecast.map(({ date, day }) => (
          <ForecastComponent
            key={date}
            title={date}
            icon={day.condition.icon}
            temp={showCOrF ? day.avgtemp_c : day.avgtemp_f}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayWeather;
