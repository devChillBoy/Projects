import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import ForecastDaily from './components/ForecastDaily';
import ForecastHourly from './components/ForecastHourly';
import Navbar from './components/Navbar';
import WeatherDetails from './components/WeatherDetails';
import WeatherTemp from './components/WeatherTemp';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}

interface SysInfo {
  pod: string;
}

export interface Forecast {
  dt: number;
  main: MainWeatherInfo;
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: WindInfo;
  visibility: number;
  pop: number;
  sys: SysInfo;
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: CityInfo;
}

const WEATHER_KYE_API = '085809f79e73df9dacd67f77b4078f93';

function App() {
  const [city, setCity] = useState<string>('tehran');

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['repoData', city],
    queryFn: async () => {
      const { data } = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_KYE_API}&cnt=56`,
      );
      return data;
    },
  });

  if (isPending)
    return (
      <div className="grid place-items-center h-screen">
        <p className="text-3xl text-slate-700 font-bold animate-bounce">
          Loading...
        </p>
      </div>
    );

  if (error) return <p>An error has occurred: {error.message}</p>;

  console.log(data);

  function handleCity(name: string) {
    setCity(name);
    refetch();
  }

  const time = data?.list[0].dt_txt;
  const temp = data?.list[0].main;
  const wind = data?.list[0].wind;
  const icons = data?.list[0].weather[0].icon;
  const forcast = data?.list;

  return (
    <>
      <Navbar
        handleCity={handleCity}
        time={time}
      />

      <header className="flex flex-col items-center justify-center gap-8 mb-12 sm:flex-row">
        <WeatherTemp
          temp={temp}
          icons={icons}
        />
        <WeatherDetails
          temp={temp}
          wind={wind}
        />
      </header>

      <main className="flex flex-col items-center justify-center gap-12">
        <ForecastDaily forcast={forcast} />
        <ForecastHourly forcast={forcast} />
      </main>
    </>
  );
}
export default App;
