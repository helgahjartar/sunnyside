'use client';

import { useContext, ReactNode, createContext, useState } from 'react';
import { ForecastType, Location, Weather } from '../utils/types';
import { DEFAULT_CITY } from '../utils/constants';

const WeatherContext = createContext<{
   forecastType: string;
   setForecastType: (forecastType: string) => void;
   todaysWeather: Weather | undefined;
   setTodaysWeather: (weather: Weather) => void;
   weatherForecast: Weather[] | undefined;
   setWeatherForecast: (forecast: Weather[]) => void;
   selectedLocation: Location | undefined;
   setSelectedLocation: (location: Location) => void;
}>({
   forecastType: '',
   setForecastType: () => {},
   todaysWeather: undefined,
   setTodaysWeather: () => {},
   weatherForecast: [],
   setWeatherForecast: () => {},
   selectedLocation: {
      city: DEFAULT_CITY,
      country: 'IS',
   },
   setSelectedLocation: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
   const [todaysWeather, setTodaysWeather] = useState<Weather>();
   const [forecastType, setForecastType] = useState(ForecastType.OneDay);
   const [weatherForecast, setWeatherForecast] = useState<Weather[]>();
   const [selectedLocation, setSelectedLocation] = useState<Location>();

   return (
      <WeatherContext.Provider
         value={{
            forecastType,
            setForecastType,
            todaysWeather,
            setTodaysWeather,
            weatherForecast,
            setWeatherForecast,
            selectedLocation,
            setSelectedLocation,
         }}
      >
         {children}
      </WeatherContext.Provider>
   );
};

export const useWeather = () => {
   return useContext(WeatherContext);
};
