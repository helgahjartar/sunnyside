'use client';

import { useEffect, useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { API_KEY, BASE_URL, CITY_NOT_FOUND } from '../utils/constants';
import { useGetForecast } from '../api/useGetForecast';

const ForecastSearch = () => {
   const [initialForecastLoaded, setInitialForecastLoaded] = useState(false);
   const { forecastType } = useWeather();
   const { getForecast, searchError, setSearchError, city, setCity } = useGetForecast();

   // Fetch forecast upon entering page initially and if forecastType changes
   useEffect(() => {
      const fetchForecastData = async () => {
         await getForecast();
         !initialForecastLoaded && setInitialForecastLoaded(true);
      };

      fetchForecastData();
   }, [forecastType]);

   // Fetch forecast based on user's input with 300 millisec debounce
   useEffect(() => {
      if (!initialForecastLoaded) return;

      const debounce = setTimeout(() => {
         getForecast();
      }, 300);

      return () => {
         clearTimeout(debounce);
      };
   }, [city]);

   // Clear error when user clears input
   useEffect(() => {
      if (city.length === 0 && searchError) {
         setSearchError('');
      }
   }, [city, searchError]);

   // Set user's search input in the state to trigger fetch from API
   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
   };

   return (
      <div className="h-20">
         <input
            onChange={handleSearchInput}
            placeholder="Look up your favorite city"
            onKeyDown={() => setSearchError('')}
            className="border-r-2 rounded-lg h-10 w-full p-4 focus:outline-none"
         />
         {searchError && <p className="mt-1 text-sm pl-4">{searchError}</p>}
      </div>
   );
};

export default ForecastSearch;
