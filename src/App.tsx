import React from "react";
import SpliderTimer from "./components/Splide";

export type splideOptionType = {
  type?: "loop" | "slide" | "fade";
  autoplay?: boolean;
  resetProgress?: boolean;
};
function App() {
  const [splideOptions] = React.useState<splideOptionType | undefined>({
    type: "loop",
    autoplay: true,
    resetProgress: false, // To Stop Rewinding prograssbar
  });

  return (
    <>
      <h2 className="text-6xl text-center p-6"> Slide Js with loop type</h2>

      <SpliderTimer splideOptions={splideOptions} />

      <h2 className="text-6xl text-center p-6"> Slide Js with slide type</h2>

      <SpliderTimer splideOptions={{ ...splideOptions, type: "slide" }} />

      <h2 className="text-6xl text-center p-6"> Slide Js with fade type</h2>

      <SpliderTimer splideOptions={{ ...splideOptions, type: "fade" }} />

      <div className="m-72" />

      {/* <button
        onClick={() => {
          setSlideOptions((prev) => ({
            ...prev,
            type: splideOptions?.type !== "loop" ? "loop" : "other",
          }));
          console.log("in on click :", splideOptions);
        }}
      >
        {splideOptions?.type}
      </button> */}
    </>
  );
}

export default App;
