import Image from 'next/image';
import Humidity from '../../../public/static/icons/Humidity';
import Temperature from '../../../public/static/icons/Temperature';
import Icon from './WeatherIcon';
import { Weather } from '../utils/types';
import { ICON_BASE_URL } from '../utils/constants';

const WeatherDetails = ({ weather }: { weather: Weather }) => {
   return (
      <div data-testid="weather-details">
         <div className="text-xl font-bold text-black underline">{weather.day}</div>
         <div className="flex flex-row space-x-1 items-center">
            <Icon>
               <Image
                  width={40}
                  height={40}
                  alt="Weather Icon"
                  src={`${ICON_BASE_URL}${weather.icon}@2x.png`}
               />
            </Icon>
            <div className="text-lg text-black">{weather?.main}</div>
         </div>
         <div className="flex flex-row space-x-1 items-center">
            <Icon>
               <Temperature />
            </Icon>
            <div className="text-lg text-black">{weather?.temp}°</div>
         </div>
         <div data-testid="humidity" className="flex flex-row space-x-1 items-center">
            <Icon>
               <Humidity />
            </Icon>
            <div className="text-lg text-black">{weather?.humidity} %</div>
         </div>
      </div>
   );
};

export default WeatherDetails;
