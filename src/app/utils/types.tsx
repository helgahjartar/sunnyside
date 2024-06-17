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

export interface Location {
   city: string;
   country: string;
}

export const ForecastType = {
   OneDay: 'weather',
   FiveDay: 'forecast',
};
