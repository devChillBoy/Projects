import { format } from 'date-fns';
import { useRef, type FormEvent } from 'react';
import { TiWeatherSunny } from 'react-icons/ti';

type NavbarProp = {
  handleCity: (name: string) => void;
  time: string;
};

function Navbar({ handleCity, time }: NavbarProp) {
  const name = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.current) {
      handleCity(name.current.value);
      e.currentTarget.reset();
    }
  }

  return (
    <nav className="flex flex-col items-center justify-between gap-5 py-8 mb-3 sm:flex-row sm:px-12">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <TiWeatherSunny className="text-yellow-600 text-5xl" />

          <h1 className="text-2xl font-semibold sm:text-3xl">Weather App</h1>
        </div>

        <p className="font-medium text-slate-600">
          {format(new Date(time), 'dd MMM yyyy')}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter city..."
          className="border border-gray-300 outline-none rounded-l-lg px-4 py-2"
          ref={name}
        />

        <button
          type="submit"
          className="bg-orange-700 text-white rounded-r-lg px-4 py-2 hover:bg-orange-800 transition"
        >
          Go
        </button>
      </form>
    </nav>
  );
}
export default Navbar;
