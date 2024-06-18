import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherDetails from '../components/WeatherDetails';
import { Weather } from '../utils/types';

describe('WeatherDetails', () => {
   test('renders correctly based on Weather passed down', () => {
      const mockWeather: Weather = {
         id: '1',
         icon: 'mockUrl',
         day: 'Sunday',
         main: 'Tokyo',
         temp: '25',
         humidity: '97',
      };

      render(<WeatherDetails weather={mockWeather} />);

      expect(screen.getByTestId('day')).toMatchSnapshot(
         '<div class="text-xl font-bold text-black underline" data-testid="day">Sunday</div>'
      );
   });
});
