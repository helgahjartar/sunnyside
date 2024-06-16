'use client';

import { useWeather } from '../contexts/WeatherContext';
import { ForecastType } from '../utils/types';
import WeatherDetails from './WeatherDetails';

const ForecastDisplay = () => {
   const { todaysWeather, forecastType, setForecastType, weatherForecast } = useWeather();

   // Handler for forecast type toggling
   const toggleForecastType = () => {
      setForecastType(
         forecastType === ForecastType.OneDay ? ForecastType.FiveDay : ForecastType.OneDay
      );
   };

   // Simple loading component
   const Loading = (
      <>
         <div className="text-2xl font-semibold text-black">Loading..</div>
      </>
   );

   return (
      <div>
         <div className="flex flex-row justify-between items-center">
            <div className="h-12 text-black text-3xl font-bold w-full truncate py-2 px-4 capitalize">
               {todaysWeather && (
                  <>
                     {todaysWeather?.city}, {todaysWeather?.country}
                  </>
               )}
            </div>
            <div className="flex align-middle">
               <button
                  className="min-h-10 bg-orange-300 hover:bg-orange-500 text-white text-lg font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={toggleForecastType}
               >
                  {forecastType === ForecastType.OneDay
                     ? 'See 5-day Forecast'
                     : 'See Current Weather'}
               </button>
            </div>
         </div>
         <div
            className={`flex justify-between overflow-scroll mt-4 bg-[#F5ECDA] rounded-lg py-8 px-10 space-x-10 ${
               forecastType === ForecastType.OneDay ? 'sm:w-72 md:w-96' : 'w-full min-w-72'
            }`}
         >
            {forecastType === ForecastType.OneDay ? (
               <>
                  <div className="flex flex-col">
                     {todaysWeather ? <WeatherDetails weather={todaysWeather} /> : Loading}
                  </div>
               </>
            ) : (
               <>
                  {weatherForecast && weatherForecast.length > 0
                     ? weatherForecast.map((weatherDetail, i) => (
                          <div key={i} className="flex flex-col">
                             <WeatherDetails weather={weatherDetail} />
                          </div>
                       ))
                     : Loading}
               </>
            )}
         </div>
      </div>
   );
};

export default ForecastDisplay;
