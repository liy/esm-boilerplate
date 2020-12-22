This is a quick proof of concept repo for loading esm module with webpack 5 module federation fallbacks.

So you can write this cross browsers:

```javascript
const HelloWorld = React.lazy(() => import("http://127.0.0.1:3001/esm.js"));

import HelloWorld from "http://127.0.0.1:3001/esm.js";
```

`app` folder simulates the application.
`remote` build the esm package and has a simple http server to serve the esm script and webpack module federation fallback scripts.

`HelloWorld` component is loaded via esm module. Styles are embeded in the esm module. If no esm module supported, fallback to webpack 5 module federation.

## How it works

esm script `type` attribute is set to `module` so modern browser knows how to handle it. Older browsers does not know what it is so it will be ignored.

webpack module federation scripts are fallback for older browser. It must also have `nomodule` attribute, so modern browser will ignore these scripts.

## The hacky part

URL in the import statement is replaced with correct webpack module federation path at transpile time. It can be done by search and replace plugins in webpack, babel or rollup.

## Pros

1. Smaller bundle size for modern browser.
2. Future proof code with clean syntax.

## Cons

1. Only works if using latest webpack.
2. Extra webpack, babel and rollup configs.
