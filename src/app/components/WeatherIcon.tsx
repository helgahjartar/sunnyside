const WeatherIcon = ({ children, style }: { children: JSX.Element; style?: string }) => {
   return <div className={`h-10 w-10 ${style}`}>{children}</div>;
};

export default WeatherIcon;
