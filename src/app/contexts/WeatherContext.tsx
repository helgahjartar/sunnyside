'use client';

import { useContext, ReactNode, createContext, useState } from 'react';
import { ForecastType, Weather } from '../utils/types';

const WeatherContext = createContext<{
   forecastType: string;
   setForecastType: (forecastType: string) => void;
   todaysWeather: Weather | undefined;
   setTodaysWeather: (weather: Weather) => void;
   weatherForecast: Weather[] | undefined;
   setWeatherForecast: (forecast: Weather[]) => void;
}>({
   forecastType: '',
   setForecastType: () => {},
   todaysWeather: undefined,
   setTodaysWeather: () => {},
   weatherForecast: [],
   setWeatherForecast: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
   const [todaysWeather, setTodaysWeather] = useState<Weather>();
   const [forecastType, setForecastType] = useState(ForecastType.OneDay);
   const [weatherForecast, setWeatherForecast] = useState<Weather[]>();

   return (
      <WeatherContext.Provider
         value={{
            forecastType,
            setForecastType,
            todaysWeather,
            setTodaysWeather,
            weatherForecast,
            setWeatherForecast,
         }}
      >
         {children}
      </WeatherContext.Provider>
   );
};

export const useWeather = () => {
   return useContext(WeatherContext);
};
