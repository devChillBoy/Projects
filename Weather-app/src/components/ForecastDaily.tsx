import { format } from 'date-fns';
import { type Forecast } from '../App';

type ForecastDailyProp = {
  forcast: Forecast[];
};

function ForecastDaily({ forcast }: ForecastDailyProp) {
  const dailyForcast = forcast.filter((list) => {
    return format(new Date(list.dt_txt), 'HH') === '00';
  });

  return (
    <ul className="flex flex-wrap justify-center items-center gap-5">
      {dailyForcast.map((list) => (
        <li
          key={list.dt}
          className="border border-slate-400 rounded-lg p-3 text-center"
        >
          <img
            src={`https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}
            alt=""
          />
          <h3 className="text-lg">{format(new Date(list.dt_txt), 'eeee')}</h3>
          <p className="text-xl font-medium">
            {Math.floor(list.main.temp - 273.15)}&deg;
          </p>
        </li>
      ))}
    </ul>
  );
}
export default ForecastDaily;
