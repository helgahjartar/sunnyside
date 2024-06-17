'use client';

import { useEffect, useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { API_KEY, BASE_URL } from '../utils/constants';
import { useGetForecast } from '../api/useGetForecast';

const ForecastSearch = () => {
   const [initialForecastLoaded, setInitialForecastLoaded] = useState(false);
   const { forecastType } = useWeather();
   const { getForecast, searchError, setSearchError, city, setCity } = useGetForecast();

   // Fetch forecast upon entering page initially
   useEffect(() => {
      const fetchInitialData = async () => {
         await getForecast();
         setInitialForecastLoaded(true);
      };

      fetchInitialData();
   }, [forecastType]);

   // Fetch forecast based on user's input
   useEffect(() => {
      if (!initialForecastLoaded) return;

      const debounce = setTimeout(() => {
         getForecast();
      }, 300);

      return () => {
         clearTimeout(debounce);
      };
   }, [city]);

   // Clear error when
   useEffect(() => {
      if (city.length === 0 && searchError) {
         setSearchError(false);
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
