import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from 'lucide-react'
import { useState } from 'react'

type ImageSliderProps = {
  images: {
    url: string
    alt: string
  }[]
}

function ImageSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0)

  function showPrevImage() {
    setImageIndex((prevIndex) => {
      if (prevIndex === 0) return images.length - 1
      return prevIndex - 1
    })
  }

  function showNextImage() {
    setImageIndex((prevIndex) => {
      if (prevIndex === images.length - 1) return 0
      return prevIndex + 1
    })
  }

  return (
    <section
      aria-label="Image Slider"
      className="slider-container"
    >
      <div className="img-slider-container">
        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            style={{ translate: `${-100 * imageIndex}%` }}
            aria-hidden={imageIndex !== index}
          />
        ))}
      </div>

      <button
        onClick={showPrevImage}
        className="arrow-button"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>

      <button
        onClick={showNextImage}
        className="arrow-button"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>

      <div className="dot-botton-container">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
export default ImageSlider
