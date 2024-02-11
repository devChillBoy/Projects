import ImageSlider from './ImageSlider'
import car1 from './assets/images/car-1.jpg'
import car2 from './assets/images/car-2.jpg'
import car3 from './assets/images/car-3.jpg'
import car4 from './assets/images/car-4.jpg'
import car5 from './assets/images/car-5.jpg'

const IMAGES = [
  { url: car1, alt: 'Car One' },
  { url: car2, alt: 'Car Two' },
  { url: car3, alt: 'Car Three' },
  { url: car4, alt: 'Car Four' },
  { url: car5, alt: 'Car Five' },
]

function App() {
  return (
    <main aria-label="Container">
      <ImageSlider images={IMAGES} />
    </main>
  )
}
export default App
