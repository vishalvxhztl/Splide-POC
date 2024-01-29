import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
import { useRef } from "react";

// random color generator
function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red},${green},${blue})`;
}

function SpliderTimer() {
  const circularProgress = useRef<HTMLDivElement | null>(null);

  const firstColor = getRandomColor();

  const splideOptions = { autoplay: true };

  return (
    <>
      <Splide
        hasTrack={false}
        options={splideOptions}
        aria-label="My Favorite Images"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onAutoplayPlaying={(_e: any, rate: number) => {
          if (circularProgress.current) {
            // console.log(rate); // 0-1
            circularProgress.current.style.background = `conic-gradient(${firstColor} ${
              rate * 360
            }deg,rgb(255,255,255) 0deg)`;
          }
        }}
        className="border"
      >
        <SplideTrack>
          <SplideSlide>
            <img src="https://dummyimage.com/600x400/000/fff" alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://dummyimage.com/600x401/000/fff" alt="Image 2" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://dummyimage.com/600x403/000/fff" alt="Image 3" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://dummyimage.com/600x404/000/fff" alt="Image 4" />
          </SplideSlide>
        </SplideTrack>

        <div className="splide__arrows" />

        {/* Horizontal Progress bar [START]*/}
        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>
        {/* Horizontal Progress bar [END]*/}

        {/* Circular Progress Bar [START]*/}
        <div className="relative w-16 h-16">
          <div
            className="w-16 h-16 border rounded-full"
            ref={circularProgress}
          />

          {/* Play - Pause Buttons */}
          <button
            className="splide__toggle w-12 h-12 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-300 rounded-full"
            type="button"
          >
            <span className="splide__toggle__play">&gt;</span>
            <span className="splide__toggle__pause">||</span>
          </button>
        </div>
        {/* Circular Progress Bar [END]*/}
      </Splide>
    </>
    // </div>
  );
}

export default SpliderTimer;
