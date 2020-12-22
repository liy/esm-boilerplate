This is a quick proof of concept repo for loading esm module with webpack 5 module federation fallbacks.

So you can write these kind of code cross browser :

```javascript
const HelloWorld = React.lazy(() => import("http://127.0.0.1:3001/esm.js"));
// or
import HelloWorld from "http://127.0.0.1:3001/esm.js";
```

## Intro

To run the application, navigate to `app` and `remote` folder and run `npm start`.

`app` folder simulates the application.

`remote` build the esm package and has a simple http server to serve both esm script and webpack module federation fallback scripts.

`HelloWorld` component is loaded via esm module. Styles are embeded in the esm module. If no esm module supported, fallback to webpack 5 module federation.

## ESM

esm script `type` attribute is set to `module` so modern browser knows how to handle it. Older browsers does not know what it is so it will be ignored.

webpack module federation scripts are fallback for older browser. It must also have `nomodule` attribute, so modern browser will ignore these scripts.

## The hacky part

URL in the import statement is replaced with correct webpack module federation path at transpile time, using `babel-plugin-search-and-replace`. Of course it can be done by other plugins in webpack, babel or rollup.

## Pros

1. Smaller bundle size for modern browser.
2. Future proof code with clean syntax.

## Cons

1. Only works if using latest webpack.
2. Extra webpack, babel and rollup configs.

## Extra

[Snowpack](https://www.snowpack.dev/) is better solution if you don't want to work with webpack and rollup.
