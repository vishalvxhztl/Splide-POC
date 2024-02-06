import clsx from "clsx";
import React from "react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { PaginationData, PaginationItem, Options } from "@splidejs/splide";
import { getRandomColor } from "@/libs/color";

//--- Mock Data
const mutliSplidesData = [
  {
    imageUrl: "https://dummyimage.com/600x401/000/fff",
    subTitle: "Optional Eyebrow",
    title: "We are ethical, honest and fair",
    content:
      "A carousel can sync with another carousel by sync() method, and isNaviation option makes the carousel clickable for navigation. By using these 2 features, we can make a carousel with a thumbnail control like",
  },
  {
    imageUrl: "https://dummyimage.com/600x403/000/fff",
    subTitle: "Optional Eyebrow",
    title: "Shure ssociate show respect for one another in all curcumstances",
    content:
      "A carousel can sync with another carousel by sync() method, and isNaviation option makes the carousel clickable for navigation. By using these 2 features, we can make a carousel with a thumbnail control like",
  },
  {
    imageUrl: "https://dummyimage.com/600x405/000/fff",
    subTitle: "Optional Eyebrow",
    title: "Good corporate citizen, neighbor and employer",
    content:
      "A carousel can sync with another carousel by sync() method, and isNaviation option makes the carousel clickable for navigation. By using these 2 features, we can make a carousel with a thumbnail control like",
  },
  {
    imageUrl: "https://dummyimage.com/600x407/000/fff",
    subTitle: "Optional Eyebrow",
    title: "Unmatched quality, reliability and durability",
    content:
      "A carousel can sync with another carousel by sync() method, and isNaviation option makes the carousel clickable for navigation. By using these 2 features, we can make a carousel with a thumbnail control like",
  },
];

const MultiSplide = ({ splideOptions }: { splideOptions?: Options }) => {
  const circularProgress = React.useRef<HTMLDivElement | null>(null);
  const linearProgressBar = React.useRef<HTMLDivElement | null>(null);

  const paginationMoveHanlder = (
    _e: typeof Splide,
    data: PaginationData,
    _prev: PaginationItem,
    curr: PaginationItem
  ) => {
    // console.log("Pagination updated:data, prev, curr", data, prev, curr);

    const liList = data.items;
    const nextIndex = (curr.page + 1) % liList.length;

    // First remove im-next from all list element
    liList.forEach((liElement) => liElement.button.classList.remove("im-next"));
    // apply class im-next
    liList[nextIndex]?.button?.classList.add("im-next");
  };
  const pageMovedHandler = (_e: typeof Splide) => {
    _e.Components.Autoplay.play();
  };
  const autoplayHandler = (_e: typeof Splide, rate: number) => {
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

    // if (linearProgressBar.current) {
    //   linearProgressBar.current.style.width = `${
    //     dividedProgress * newIndex + dividedProgress * rate
    //   }%`;
    // }

    if (circularProgress.current) {
      // console.log(rate); // 0-1
      circularProgress.current.style.background = `conic-gradient(${firstColor} ${
        rate * 360
      }deg,rgb(255,255,255) 0deg)`;
    }
  };

  const firstColor = getRandomColor();

  return (
    <div className="text-white">
      <h1 className="text-6xl text-center p-6 text-white">
        Slide Js with Multi slides sync
      </h1>
      <h2 className="capitalize ">Core Values</h2>
      <Splide
        hasTrack={false}
        options={splideOptions}
        onAutoplayPlaying={autoplayHandler}
        onPaginationUpdated={paginationMoveHanlder}
        onMoved={pageMovedHandler}
        className="border"
      >
        <SplideTrack>
          {mutliSplidesData.map((slide, idx) => (
            <SplideSlide
              key={idx}
              className={clsx("w-full flex", "border border-white")}
            >
              <div className={clsx("max-w-1/2", "border border-white m-1")}>
                <img src={slide.imageUrl} alt={slide.title} />
              </div>
              <div>
                <h5>{slide.subTitle}</h5>
                <h4>{slide.title}</h4>
                <p>{slide.content}</p>
                <div>
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
                </div>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
        {/* <div
          className={`splide__progress__bar bg-[#7edd2b]`}
          // ref={linearProgressBar}
        /> */}
      </Splide>
      <div className={clsx("border-white")}></div>
    </div>
  );
};

export default MultiSplide;
