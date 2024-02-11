import { format } from 'date-fns';
import { Forecast } from '../App';

type ForecastHourlyProp = {
  forcast: Forecast[];
};

function ForecastHourly({ forcast }: ForecastHourlyProp) {
  return (
    <ul className="grid w-full lg:grid-cols-2 xl:grid-cols-3">
      {forcast.map((list) => (
        <li className="flex items-center justify-between gap-4 py-2 px-8 bg-slate-100">
          <div className="text-center">
            <h3 className="uppercase">
              {format(new Date(list.dt_txt), 'eeee')}
            </h3>
            <p className="text-lg font-medium">
              {format(new Date(list.dt_txt), 'h:mm aa')}
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}
            alt=""
          />
          <ul className="flex gap-5 text-center ml-auto overflow-x-scroll">
            <li>
              <h3>TEMP</h3>
              <p>{Math.floor(list.main.temp - 273.15)}&deg;</p>
            </li>
            <li>
              <h3>HUMIDITY</h3>
              <p>{list.main.humidity}%</p>
            </li>
            <li>
              <h3>WIND</h3>
              <p>{list.wind.speed}mph</p>
            </li>
            <li>
              <h3>PRESSURE</h3>
              <p>{list.main.pressure}mb</p>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
}
export default ForecastHourly;
