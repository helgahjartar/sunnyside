export interface Weather {
   id: string;
   icon: string;
   day: string;
   main: string;
   temp: string;
   city: string;
   country: string;
   humidity: string;
}

export const ForecastType = {
   OneDay: 'weather',
   FiveDay: 'forecast',
};

export const API_KEY = 'cd2f7b617ca463dd7cff882c0222cc51';
export const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
export const ICON_BASE_URL = 'https://openweathermap.org/img/wn/';
export const DEFAULT_CITY = 'Reykjavík';
