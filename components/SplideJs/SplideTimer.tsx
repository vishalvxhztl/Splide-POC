//--- Dependencies
import React, { useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
//--- Types
import { PaginationData, PaginationItem, Options } from "@splidejs/splide";
//--- Styles
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";
// import { getRandomColor } from "@/libs/color";
import clsx from "clsx";

function SpliderTimer({ splideOptions }: { splideOptions?: Options }) {
  const circularProgress = useRef<SVGCircleElement | null>(null);
  const linearProgressBar = useRef<HTMLDivElement | null>(null);
  const svgCircle = {
    circleWidth: 50, // radius(r) , in px
    circleBorder: 5, // progress circle border in px
    innerCircleBorder: 2, // inner circle border in px
    svgWidth: 100, //  [TIPS] min 2*r of circle width height will be same
    dashStrokeGap: 155, // [TIPS] svg dash gap normally 4*r of radius [this value is quite complex, you have to play around the number]
  };
  // const firstColor = getRandomColor();

  return (
    <>
      <Splide
        id="timer-slide"
        hasTrack={false}
        options={splideOptions}
        aria-label="My Favorite Images"
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
              _e.Components.Controller.getNext() >= 0
                ? _e.Components.Controller.getNext() - 1
                : totalSlides - 1;
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
            // circularProgress.current.style.background = `conic-gradient(${firstColor} ${
            //   rate * 360
            // }deg,rgb(255,255,255) 0deg)`;
            circularProgress.current.setAttribute(
              "stroke-dashoffset",
              `${svgCircle.dashStrokeGap - svgCircle.dashStrokeGap * rate}`
            ); // will start from x value -> reach to 0 for example start with 4* circle width and reach to 0
          }
        }}
        onPaginationUpdated={(
          _e: typeof Splide,
          data: PaginationData,
          _prev: PaginationItem,
          curr: PaginationItem
        ) => {
          // console.log("Pagination updated:data, prev, curr", data, prev, curr);

          const liList = data.items;
          const nextIndex = (curr.page + 1) % liList.length;

          // First remove im-next from all list element
          liList.forEach((liElement) =>
            liElement.button.classList.remove("im-next")
          );
          // apply class im-next
          liList[nextIndex]?.button?.classList.add("im-next");

          // On change/move of slide manual trigger playing of slides
          // _e.Components.Autoplay.play(); // will not work if we remove the pagination
        }}
        onMoved={(_e: any) => {
          // On change/move of slide manual trigger playing of slides
          _e.Components.Autoplay.play(); // this code we can do put in onPaginationUpdated Handler, but provide i think proper way is handle play on saperate place.
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
        <div className={clsx("relative", `w-[100px] h-[100px]`)}>
          {/* <div
            className="w-16 h-16 border rounded-full"
            ref={circularProgress}
          /> */}
          <svg
            height={svgCircle.svgWidth}
            width={svgCircle.svgWidth}
            xmlns="http://www.w3.org/2000/svg"
            className="-rotate-90"
          >
            <circle
              stroke="rgb(255 255 255)"
              fill="none"
              r={svgCircle.circleWidth / 2} // radius of circle
              cx={svgCircle.circleWidth} // center point in svg so it should half os height and width
              cy={svgCircle.circleWidth}
              stroke-width={svgCircle.circleBorder} // border width
              strokeDasharray={svgCircle.dashStrokeGap} // stroke dash array
              strokeDashoffset={svgCircle.dashStrokeGap}
              strokeLinecap="round"
              ref={circularProgress}
            />
            <circle
              stroke="rgb(255 255 255 / 27%)"
              fill="none"
              r={svgCircle.circleWidth / 2} // radius of circle
              cx={svgCircle.circleWidth} // center point in svg so it should half os height and width
              cy={svgCircle.circleWidth}
              stroke-inner={svgCircle.innerCircleBorder} // border width
              strokeDasharray={4 * svgCircle.circleWidth} // stroke dash array
            />
          </svg>
          {/* Play - Pause Buttons */}
          <button
            className={clsx(
              "splide__toggle absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white",
              `w-[50px] h-[50px]`
            )}
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
