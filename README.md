# Tailfly
Its a tailwindcss plugin for managing multiple themes in a website.


<hr/>

## Installation

Install from npm:
<br/>
```

npm install tailfly -D

```
<br/>

Add the plugin to your **`tailwind.config.js`** file:

```
import Tailfly from "tailfly";
...

  plugins: [
    Tailfly({
     ...
    })

...
```
<p align="center" style="font-weight:bold;">or</p>

```
...

  plugins: [
    require("tailfly")({
     ...
    })

...
```

## Usage

### Adding colors
```
  ...
    Tailfly({
      def: {
        primary: ["#fff", "#0070f3"],
        brand: ["skyblue", "pink"],
      }
      ...
    })
  ...
 ```


<img width="830" alt="image-1" style="border-radius:28px;" src="https://github.com/malikmubashar/tailfly/assets/117813579/2f72c75a-73c1-4dac-8318-79bc020ed5d3">

### Defining modes
```
  ...
    Tailfly({
      def: {
       modes: ['light', '!dark', "zela"], //default ["light","dark"] 
  ...
 ```
You can define multiple theme modes.

**!** : This symbol is used define the default theme mode [ Index 0 is default if not specified ].

### Defining CSS Properties
CSS properties can be defined in the inf object inside def object. see below example:
```
  ...
    Tailfly({
      def: {
        circle: ['4rem', '6rem'],
        borderW: ['4px', '2px'],
        inf: {
          circle: "borderRadius",
          borderW: "borderWidth"
        }
  ...
 ```

<img width="628" style="border-radius:28px;" alt="image-2" src="https://github.com/malikmubashar/tailfly/assets/117813579/c58eaad4-9d8f-4386-bb9f-268e630a02ad">

### Dark Mode

```
  ...
    Tailfly({
      def: {
        ...
      },
      darkMode: ["selector", "[class*='$']"]
    })
  ...
```

**$**: This symbol is used to define theme modes.

**Note**: DarkMode option is well described by tailwindcss.

### Dynamic Mode
This option is used for matching system theme.
```
  ...
    Tailfly({
      def: {
        dynamic: "system" // true | string,
  ...
```
String value will act as theme mode and true value will act as default theme mode. This is similar to media in tailwindcss.

**Note**: Work only for dark & light theme mode.

<br/>


## Animations

Tailfly ship an animation library. [animate.css](https://animate.style/) is very popular library for animations. All animation of this library can be used using Tailfly. Explore animate.css for demo's and other stuff.
### Usage
```
-> animation-[animation_name]

exp: 
     <div className="animation-rubberBand"></div>
```
