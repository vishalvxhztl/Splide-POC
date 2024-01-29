# ViteJS + SplideJS Awesomeness 🚀

| Task                      | Location                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Circular Progressbar      | `src/components/splide.tsx`                                                                                   |
| Event Handling            | `src/components/splide.tsx` and [Official Documentation](https://splidejs.com/guides/events/#autoplayplaying) |
| Import Issue Solution     | [Pull Request](https://github.com/Splidejs/react-splide/pull/73)                                              |
| Temporary Import Solution | `src/vite-env.d.ts`                                                                                           |

## Set up Your Magic ✨

current project node version `21.16.1` [checkout `.nvmrc`].

```sh
git clone https://github.com/vishalvxhztl/Splide-POC.git
cd Splide-POC
```

if you have nvm install use this command to set node env or install node in your machine.

```sh
nvm use
```

```sh
npm install
```

or

```sh
pnpm install
```

## Run Development

```sh
npm run dev
```

or

```sh
pnpm run dev
```

## Build Your Project

```sh
npm run build
npm run preview
```

## Unleash the Splide Events!

For smooth sailing with React Splide, let's understand the event handling process.

Each [splide js](https://splidejs.com/guides/events/#listening-to-events) event is at your fingertips in [react-splide](https://splidejs.com/integration/react-splide/#events). Just remember to use the on prefix and [camelCase](https://en.wikipedia.org/wiki/Camel_case) the event name.

### For example

<strike>autoplay:playing</strike> -> <b>onAutoplayPlaying</b>

```js
// The first parameter is the event, and the rest of the data can be found in the documentation mentioned above.
onAutoplayPlaying={(event, rate) => {
  console.log(rate); // Ranges from 0 to 1
}}
```

## Note of Caution ⚠️

`React Splide and Splide JS Activity Status` [Discussions](https://github.com/Splidejs/splide/discussions/1211)

My last checkout date [29/01/2023] 🗓️
