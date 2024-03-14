# Tailfly
Its a tailwindcss plugin for managing multiple themes in a website.


<hr/>

## Installation

Install from npm:
<br/>
```

npm install -D tailfly

```
<br/>

Then add the plugin to your **`tailwind.config.js`** file:

```
import Tailfly from "tailfly";
const config = {
...

  plugins: [
    Tailfly({
     ...
    })

...
};
```
 **_or_** 
```
const config = {
...

  plugins: [
    require("tailfly")({
     ...
    })

...
};
```

## Usage

```
  ...
    Tailfly({
      def: {
        dynamic: "system",
        modes: ['light', '!dark', "zela"],
        py: ["#fff", "#000"],
        box: ["green", "red"],
        brand: ["skyblue", "pink"],
        clr: ["#000", "#fff"],
        circle: ['3rem', '4rem', '5rem'],
        inf: {
          circle: "borderRadius"
        }
      },
      darkMode: "class"
    })
  ...
 ```

```
<main class="flex min-h-screen flex-col items-center justify-center bg-py/90 *:transition-all">
   {/* border-box|dark & bg-#box/30 are equilent. '|' symbol is used for selecting color from other theme modes where '#' is used to select default mode color. */}
   <div class="size-36 absolute bg-#box/30 rounded-circle border-2 border-box|dark border-dashed -translate-x-40 -translate-y-5"></div>
   <h1 class="text-5xl font-bold text-clr z-10">
        <span class="text-brand">Hello,</span>
        Its Tailfly!
   </h1>
 </main>
```

> output

https://github.com/malikmubashar/tailfly/assets/117813579/b9e05a9f-895a-4416-8083-321348c490dd

<br/>


## Animations

Tailfly ship the animation library. [animate.css](https://animate.style/) is very popular library for animations. All animation of this library can be used using Tailfly. Explore animate.css for demo's and other stuff.
### Usage
```

-> animation-[animation_name]

<div className="animation-rubberBand"></div>
```
