import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherDetails from '../components/WeatherDetails';
import { Weather } from '../utils/types';

describe('WeatherDetails', () => {
   test('matches snapshot based on weather passed down', () => {
      const mockWeather: Weather = {
         id: '1',
         icon: 'mockUrl',
         day: 'Sunday',
         main: 'Tokyo',
         temp: '25',
         humidity: '97',
      };

      render(<WeatherDetails weather={mockWeather} />);

      expect(screen.getByTestId('weather-details')).toMatchSnapshot();
   });
});
