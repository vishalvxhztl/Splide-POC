import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

//--- Types
import { Options } from "@splidejs/splide";

//--- Styles
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";

const SideSpace = () => {
  const splideOptions: Options = {
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    pagination: false,
    padding: "10%",
  };

  const currSlideCounterElement = React.useRef<HTMLSpanElement | null>(null);
  const totalSlideCounterElement = React.useRef<HTMLSpanElement | null>(null);

  /**
   * use to set current and total number of slide in pagination
   * @param {_splide} [Splide] - splide data | NO need to pass
   */
  const mountHandler = (_splide: typeof Splide) => {
    if (currSlideCounterElement.current) {
      currSlideCounterElement.current.textContent = (
        _splide.Components.Controller.getIndex() + 1
      ).toString();
    }
    if (totalSlideCounterElement.current) {
      totalSlideCounterElement.current.textContent = (
        _splide.Components.Controller.getEnd() + 1
      ).toString();
    }
  };

  /**
   * will use to update current page number in pagination
   * @param {_splide} [Splide] - NO need to pass | splide data
   * @param {newIndex} [number] - NO need to pass | current index of splide
   * @param {_prevIndex} [number] - NO need to pass | previous index of splide
   * @param {_destIndex} [number] - NO need to pass | A destination slide index. In the loop mode, the index can be negative or greater than the number of slides for clones.
   */
  const updatePageHandler = (
    _splide: typeof Splide,
    newIndex: number,
    _prevIndex: number,
    _destIndex: number
  ) => {
    if (currSlideCounterElement.current) {
      currSlideCounterElement.current.textContent = (newIndex + 1).toString();
    }
    _splide.Components.Autoplay.play(); // continue Autoplay after clicking on any move button
  };

  // Slide Content
  const SlideContent = () => (
    <div className={clsx("flex", "bg-white", "border", "rounded-lg", "p-3")}>
      <div className="text-black">
        <h3>Chicago</h3>
        <p>
          A carousel can sync with another carousel by sync() method, and
          isNaviation option makes the carousel clickable for navigation. By
          using these 2 features, we can make a carousel with a thumbnail
          control like
        </p>
        <button>View open positions</button>
      </div>
      <div className="relative min-w-[50%] aspect-square border border-gray-100">
        <Image
          src="https://dummyimage.com/600x600/000/fff"
          alt="random"
          sizes="90vw"
          fill
        />
      </div>
    </div>
  );

  return (
    <>
      <h2 className="text-white text-center text-4xl font-extrabold py-2">
        Splide with custom Pagination
      </h2>
      <Splide
        id="splide-space"
        hasTrack={false}
        options={splideOptions}
        onMounted={mountHandler}
        onMove={updatePageHandler}
      >
        <SplideTrack>
          {[1, 2, 3, 4].map((_, index) => (
            <SplideSlide key={index}>
              <SlideContent />
            </SplideSlide>
          ))}
        </SplideTrack>

        <div
          className={clsx(
            "flex",
            "justify-between",
            "items-center",
            "mx-[calc(10%+0.75rem)]"
          )}
        >
          <div className={clsx("text-white")}>
            <span
              className={clsx("current-page", "mr-6")}
              ref={currSlideCounterElement}
            >
              0
            </span>
            <span className={clsx("total-page")} ref={totalSlideCounterElement}>
              0
            </span>
          </div>

          <div className={clsx("splide__arrows", "flex")}>
            <button
              className={clsx("splide__arrow splide__arrow--prev")}
              type="button"
              aria-label="Previous slide"
              aria-controls="splide01-track"
            >
              &lt;-
            </button>
            <button
              className="splide__arrow splide__arrow--next"
              type="button"
              aria-label="Next slide"
              aria-controls="splide01-track"
            >
              -&gt;
            </button>
          </div>
        </div>

        <div className={clsx("bg-gray-800", "mx-[calc(10%+0.75rem)]")}>
          <div className={`splide__progress__bar`} />
        </div>
      </Splide>
    </>
  );
};

export default SideSpace;
