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
import SideSpace from "@/components/SplideJs/UseCase/SideSpace";
import MultiSplide from "@/components/SplideJs/UseCase/MultiSplide";

export default function Home() {
  const [splideOptions] = React.useState<Options | undefined>({
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,

    // To Stop Rewinding prograssbar
    // rewind: true, // Determines whether to rewind the carousel or not. This does not work in the loop mode.
  });

  return (
    <div className="bg-black">
      <h3 className="text-white text-center text-2xl font-extrabold py-2">
        Checkout new example using Navbar
      </h3>
      <hr className="my-3" />

      <h2 className="text-white text-center text-3xl font-bold py-2">
        Current Development 🧑‍💻
      </h2>
      <hr className="my-3" />
      <hr />
      {/* <SpliderTimer splideOptions={splideOptions} /> */}
      <MultiSplide splideOptions={splideOptions} />

      <div className="m-72" />
    </div>
  );
}
