import { type MainWeatherInfo, type WindInfo } from '../App';

type WeatherDetailsProp = {
  temp: MainWeatherInfo;
  wind: WindInfo;
};

function WeatherDetails({ temp, wind }: WeatherDetailsProp) {
  const high = Math.floor(temp.temp_max - 273.15);
  const low = Math.floor(temp.temp_min - 273.15);

  return (
    <ul className="grid grid-cols-3 gap-10 sm:border-l sm:border-gray-700  sm:pl-8">
      <li className="text-center">
        <h3 className="font-medium">HIGH</h3>
        <p>{high}&deg;</p>
      </li>
      <li className="text-center">
        <h3 className="font-medium">SEA_LEVEL</h3>
        <p>{temp.sea_level}m</p>
      </li>
      <li className="text-center">
        <h3 className="font-medium">WIND</h3>
        <p>{wind.speed}mph</p>
      </li>
      <li className="text-center">
        <h3 className="font-medium">LOW</h3>
        <p>{low}&deg;</p>
      </li>
      <li className="text-center">
        <h3 className="font-medium">PRESSURE</h3>
        <p>{temp.pressure}mb</p>
      </li>
      <li className="text-center">
        <h3 className="font-medium uppercase">humidity</h3>
        <p>{temp.humidity}%</p>
      </li>
    </ul>
  );
}
export default WeatherDetails;
