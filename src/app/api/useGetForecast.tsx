import axios from 'axios';
import { ForecastType, Weather } from '../utils/types';
import { API_KEY, BASE_URL, DEFAULT_CITY } from '../utils/constants';
import { useWeather } from '../contexts/WeatherContext';
import { useState } from 'react';

export const useGetForecast = () => {
   const [city, setCity] = useState(DEFAULT_CITY);
   const [searchError, setSearchError] = useState(false);
   const { setTodaysWeather, forecastType, setWeatherForecast, setSelectedLocation } = useWeather();

   const urlToSearchFor = `${BASE_URL}${forecastType}?q=${city}&units=metric&appid=${API_KEY}`;

   // Get forecast via API call, based on user's input
   const getForecast = async () => {
      try {
         const result = await axios.get(urlToSearchFor);
         if (result) {
            if (forecastType === ForecastType.OneDay) {
               setSelectedLocation({
                  city: result.data.name,
                  country: result.data.sys.country,
               });

               setTodaysWeather({
                  id: result.data.weather[0].id,
                  icon: result.data.weather[0].icon,
                  day: 'Current Weather',
                  main: result.data.weather[0].main,
                  temp: result.data.main.temp,
                  city: result.data.name,
                  country: result.data.sys.country,
                  humidity: result.data.main.humidity,
               });
            } else {
               const fiveDayForecast = result.data.list;
               const dailyForecasts = [];

               setSelectedLocation({
                  city: result.data.city.name,
                  country: result.data.city.country,
               });

               for (let i = 0; i < fiveDayForecast.length; i += 8) {
                  const dailyForecast = fiveDayForecast[i];
                  dailyForecasts.push(dailyForecast);
               }

               const forecasts: Weather[] = dailyForecasts.map((item: any, i) => ({
                  id: item.weather[0].id,
                  icon: item.weather[0].icon,
                  day:
                     i === 0
                        ? 'Today'
                        : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
                  main: item.weather[0].main,
                  temp: item.main.temp,
                  city: item.name,
                  country: item.sys.country,
                  humidity: item.main.humidity,
               }));

               setWeatherForecast(forecasts);
            }
         }
      } catch (error) {
         if (axios.isAxiosError(error) && error.response.status === 404) {
            setSearchError(true);
         }
      }
   };

   return { getForecast, searchError, setSearchError, city, setCity };
};
