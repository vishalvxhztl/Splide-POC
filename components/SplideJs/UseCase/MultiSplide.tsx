import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

//--- Types
import { PaginationData, PaginationItem, Options } from "@splidejs/splide";
//--- libs
import { getRandomColor } from "@/libs/color";

type slideType = {
  imageUrl: string;
  subTitle: string;
  title: string;
  content: string;
};
//--- Mock Data
const mutliSplidesData: Array<slideType> = [
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

const MultiSplide = ({
  splideOptions,
}: {
  splideOptions: Options | undefined;
}) => {
  splideOptions = {
    ...splideOptions,
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    pagination: false,
  };

  const [slide, setSlide] = React.useState<typeof Splide>();

  const circularProgress = React.useRef<HTMLDivElement | null>(null);
  const gallerySlidebar = React.useRef<HTMLUListElement | null>(null);
  // const linearProgressBar = React.useRef<HTMLDivElement | null>(null);

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
  const pageMovedHandler = (_slide: typeof Splide) => {
    if (gallerySlidebar.current) {
      gallerySlidebar.current.childNodes.forEach((liSlide) => {
        (liSlide as HTMLLIElement).classList.remove("is-active");
      });
      (
        gallerySlidebar.current.childNodes[
          _slide.Components.Controller.getIndex() ?? 0
        ] as HTMLLIElement
      ).classList.add("is-active");
    }
    _slide.Components.Autoplay.play();
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

    if (circularProgress.current) {
      // console.log(rate); // 0-1
      circularProgress.current.style.background = `conic-gradient(${firstColor} ${
        rate * 360
      }deg,rgb(255,255,255) 0deg)`;
    }
  };

  const galleryClickHandler = (index: number) => {
    if (gallerySlidebar.current) {
      // remove is active from all nodes
      gallerySlidebar.current.childNodes.forEach((liSlide) => {
        (liSlide as HTMLLIElement).classList.remove("is-active");
      });
      // is active to current click node
      (
        gallerySlidebar.current.childNodes[index] as HTMLLIElement
      ).classList.add("is-active");
      // move and start autoplay
      slide.go(index);
      slide.Components.Autoplay.play();
    }
  };

  const onMountHandler = (_slide: typeof Splide) => {
    // Set Slide data into state for later use
    setSlide(_slide);

    //set is-active class in thumbnail slide
    if (gallerySlidebar.current) {
      (
        gallerySlidebar.current.childNodes[
          _slide.Components.Controller.getIndex() ?? 0
        ] as HTMLLIElement
      ).classList.add("is-active");
    }
  };

  const firstColor = getRandomColor();

  const PrimarySlideContent = ({ slide }: { slide: slideType }) => {
    return (
      <>
        <div
          className={clsx("relative min-w-[50%] aspect-[5/4]", "border", "m-1")}
        >
          <Image src={slide.imageUrl} alt={slide.title} fill />
        </div>
        <div className="p-4">
          <h5
            className={clsx("text-gray-600", "font-bold", "capitalize", "my-2")}
          >
            {slide.subTitle}
          </h5>
          <h4 className={clsx("font-extrabold", "text-2xl", "my-2")}>
            {slide.title}
          </h4>
          <p className={clsx("my-2")}> {slide.content}</p>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white">
      <h1 className="text-6xl text-center p-6 text-white">
        Slide Js with Multi slides sync
      </h1>
      <h2 className="capitalize ">Core Values</h2>
      <Splide
        id="multi-slides"
        hasTrack={false}
        options={splideOptions}
        onAutoplayPlaying={autoplayHandler}
        onPaginationUpdated={paginationMoveHanlder}
        onMoved={pageMovedHandler}
        onMounted={onMountHandler}
        className="relative border"
      >
        <SplideTrack>
          {mutliSplidesData.map((slide, idx) => (
            <SplideSlide
              key={idx}
              className={clsx("w-full flex", "border border-black")}
            >
              <PrimarySlideContent slide={slide} />
            </SplideSlide>
          ))}
        </SplideTrack>

        <div
          className={clsx(
            "absolute",
            "top-2/3",
            "right-12",
            "flex",
            "justify-between",
            "items-center",
            "w-[40%]"
          )}
        >
          <div className="relative w-12 h-12">
            <div
              className="w-12 h-12 border rounded-full"
              ref={circularProgress}
            />

            {/* Play - Pause Buttons */}
            <button
              className="splide__toggle w-10 h-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-300 rounded-full"
              type="button"
            >
              <span className="splide__toggle__play">&gt;</span>
              <span className="splide__toggle__pause">||</span>
            </button>
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
              className={clsx("splide__arrow splide__arrow--next")}
              type="button"
              aria-label="Next slide"
              aria-controls="splide01-track"
            >
              -&gt;
            </button>
          </div>
        </div>
        <div></div>
        {/* <div
          className={`splide__progress__bar bg-[#7edd2b]`}
          // ref={linearProgressBar}
        /> */}
        <ul
          className={clsx("border-black", "flex", "mt-4")}
          ref={gallerySlidebar}
        >
          {mutliSplidesData.map((slide, index) => (
            <li
              key={index}
              className={clsx(
                "border-2",
                "border-black",
                "m-1",
                "p-4",
                "basis-0",
                "grow-[1]",
                "cursor-pointer",
                "thumbnail"
                // "shrink-[1]"
              )}
              onClick={() => galleryClickHandler(index)}
            >
              <p className={clsx("font-semibold")}>
                {index + 1 < 10 ? "0" + (index + 1) : index}
              </p>
              <h4 className={clsx("font-extrabold")}>{slide.title}</h4>
            </li>
          ))}
        </ul>
      </Splide>
    </div>
  );
};

export default MultiSplide;
