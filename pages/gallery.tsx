import React from "react";
import SpliderTimer from "@/components/SplideJs/SplideTimer";
//--- Types
import { Options } from "@splidejs/splide";
//--- Styles
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";
import MultiSplide from "@/components/SplideJs/UseCase/MultiSplide";

export default function Timer() {
  const [splideOptions] = React.useState<Options | undefined>({
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false, // To Stop Rewinding prograssbar
    // rewind: true, // Determines whether to rewind the carousel or not. This does not work in the loop mode.
  });

  return (
    <div>
      <h2 className="text-6xl text-white text-center p-6">
        Multi slide (Gallery) with loop type
      </h2>
      <MultiSplide splideOptions={splideOptions} />

      <h2 className="text-6xl text-white text-center p-6">
        Multi slide (Gallery) with slide type
      </h2>
      <MultiSplide splideOptions={{ ...splideOptions, type: "slide" }} />
    </div>
  );
}
