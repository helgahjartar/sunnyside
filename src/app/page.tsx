import Header from './components/Header';
import ForecastDisplay from './components/WeatherDisplay';
import ForecastSearch from './components/WeatherSearch';

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
         <div className="flex flex-col w-full">
            <Header />
            <div className="mt-10">
               <ForecastSearch></ForecastSearch>
            </div>
            <div className="">
               <ForecastDisplay></ForecastDisplay>
            </div>
         </div>
      </main>
   );
}
