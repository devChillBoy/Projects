import { type MainWeatherInfo } from '../App';

type WeatherTempProp = {
  temp: MainWeatherInfo;
  icons: string;
};

function WeatherTemp({ temp, icons }: WeatherTempProp) {
  const temperature = Math.floor(temp.temp - 273.15);

  return (
    <div className="flex items-center">
      <img
        src={`https://openweathermap.org/img/wn/${icons}@4x.png`}
        alt="weather-icon"
      />
      <h2 className="text-5xl font-bold">{temperature}&deg;</h2>
    </div>
  );
}

export default WeatherTemp;
