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

export default function Timer() {
  const [splideOptions] = React.useState<Options | undefined>({
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false, // To Stop Rewinding prograssbar
    // rewind: true, // Determines whether to rewind the carousel or not. This does not work in the loop mode.
  });

  return (
    <div className="bg-gray-800">
      <h2 className="text-6xl text-center p-6"> Slide Js with loop type</h2>
      <SpliderTimer splideOptions={splideOptions} />

      <h2 className="text-6xl text-center p-6"> Slide Js with slide type</h2>
      <SpliderTimer splideOptions={{ ...splideOptions, type: "slide" }} />
      <h2 className="text-6xl text-center p-6"> Slide Js with fade type</h2>
      
      <SpliderTimer splideOptions={{ ...splideOptions, type: "fade" }} />

      <div className="m-72" />
    </div>
  );
}
