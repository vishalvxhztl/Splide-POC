//--- Dependencies
import { useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
//--- Types
import { splideOptionType } from "../App";
//--- Styles
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";

export type splidePaginationElementType = {
  button: HTMLButtonElement;
  li: HTMLLIElement;
  page: number;
  [key: string]: Element | number;
};

// random color generator
function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red},${green},${blue})`;
}

function SpliderTimer({ splideOptions }: { splideOptions?: splideOptionType }) {
  const circularProgress = useRef<HTMLDivElement | null>(null);
  const linearProgressBar = useRef<HTMLDivElement | null>(null);

  // create onetime flag that will first false then never turn into true
  // until the page refersh or component mount again
  // let isSlideLoopOnce = false;

  const firstColor = getRandomColor();

  return (
    <>
      <Splide
        hasTrack={false}
        options={splideOptions}
        aria-label="My Favorite Images"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onAutoplayPlaying={(_e: any, rate: number) => {
          const totalSlides: number = _e.Components.Controller.getEnd() + 1;
          let newIndex: number;
          if (splideOptions?.type === "loop") {
            // for loop getnext() for last slide is 0
            newIndex =
              _e.Components.Controller.getNext() != 0
                ? _e.Components.Controller.getNext() - 1
                : totalSlides - 1; // for the last slide
          } else {
            // for type!==loop getnext() for last slide is -1
            newIndex =
              _e.Components.Controller.getNext() <= 0
                ? totalSlides - 1
                : _e.Components.Controller.getNext() - 1;
          }

          const dividedProgress = 100 / totalSlides;
          // console.log(
          //   `current index : ${newIndex} move till ${
          //     dividedProgress * newIndex + dividedProgress
          //   }`,
          //   _e.Components.Controller.getNext()
          // );

          if (linearProgressBar.current) {
            linearProgressBar.current.style.width = `${
              dividedProgress * newIndex + dividedProgress * rate
            }%`;
          }

          if (circularProgress.current) {
            // console.log(rate); // 0-1
            circularProgress.current.style.background = `conic-gradient(${firstColor} ${
              rate * 360
            }deg,rgb(255,255,255) 0deg)`;
          }
        }}
        onPaginationUpdated={(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          _e: any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any,
          _prev: splidePaginationElementType,
          curr: splidePaginationElementType
        ) => {
          // console.log("Pagination updated:data, prev, curr", data, prev, curr);

          const liList: Array<splidePaginationElementType> = data.items;
          const nextIndex = (curr.page + 1) % liList.length;

          //First remove im-next from all list element
          liList.forEach((liElement) =>
            liElement.button.classList.remove("im-next")
          );
          //apply class im-next
          liList[nextIndex]?.button?.classList.add("im-next");
        }}
        className="border"
      >
        <SplideTrack>
          <SplideSlide data-splide-interval="10000">
            <img src="https://dummyimage.com/600x400/000/fff" alt="Image 1" />
          </SplideSlide>
          <SplideSlide data-splide-interval="10000">
            <img src="https://dummyimage.com/600x401/000/fff" alt="Image 2" />
          </SplideSlide>
          <SplideSlide data-splide-interval="10000">
            <img src="https://dummyimage.com/600x402/000/fff" alt="Image 3" />
          </SplideSlide>
          <SplideSlide data-splide-interval="10000">
            <img src="https://dummyimage.com/600x403/000/fff" alt="Image 4" />
          </SplideSlide>
        </SplideTrack>

        <div className="splide__arrows" />

        {/* Horizontal Progress bar [START]*/}
        <div className="splide__progress">
          <div
            className={`my-progress bg-[#ffc64a] h-1`}
            ref={linearProgressBar}
          />
          {/* Use this for default progressbar style */}
          {/* <div
            className={`splide__progress__bar bg-[#7edd2b]`}
            // ref={linearProgressBar}
          /> */}
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
