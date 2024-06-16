'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWeather } from '../contexts/WeatherContext';
import { BASE_URL, DEFAULT_CITY } from '../utils/constants';
import { ForecastType, Weather } from '../utils/types';

const ForecastSearch = () => {
   const { setTodaysWeather, forecastType, setWeatherForecast } = useWeather();
   const [city, setCity] = useState(DEFAULT_CITY);
   const [searchError, setSearchError] = useState(false);

   const urlToSearchFor = `${BASE_URL}${forecastType}?q=${city}&units=metric&appid=${API_KEY}`;

   useEffect(() => {
      getForecast();
   }, [forecastType]);

   useEffect(() => {
      const debounce = setTimeout(() => {
         getForecast();
      }, 300);

      return () => {
         clearTimeout(debounce);
      };
   }, [city]);

   useEffect(() => {
      if (city.length === 0 && searchError) {
         setSearchError(false);
      }
   }, [city, searchError]);

   // Get forecast via API call, based on user's input
   const getForecast = async () => {
      try {
         const result = await axios.get(urlToSearchFor);
         if (!result) return;

         if (forecastType === ForecastType.OneDay) {
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
      } catch (error) {
         if (axios.isAxiosError(error) && error.response.status === 404) {
            setSearchError(true);
         }
      }
   };

   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
   };

   return (
      <div className="h-20">
         <input
            onChange={handleSearchInput}
            placeholder="Look up your favorite city"
            onKeyDown={() => setSearchError(false)}
            className="border-r-2 rounded-lg h-10 w-full p-4 focus:outline-none"
         />
         {searchError && (
            <p className="mt-1 text-sm pl-4">There is no city by that name, please try again</p>
         )}
      </div>
   );
};

export default ForecastSearch;
