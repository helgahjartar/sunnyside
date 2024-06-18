import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherDisplay from '../components/WeatherDisplay';

describe('WeatherDisplay', () => {
   test('matches snapshot when in loading state', () => {
      render(<WeatherDisplay />);

      expect(screen.getByTestId('weather-display')).toMatchSnapshot();
   });
});
