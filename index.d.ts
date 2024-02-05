// Custom Type of Slide JS
type splideOptionType = {
  type?: "loop" | "slide" | "fade";
  autoplay?: boolean;
  resetProgress?: boolean;
  rewind?: boolean;
  pauseOnHover?: boolean;
  [key: string]: boolean | number | string | undefined;
};

declare module "@splidejs/react-splide";
