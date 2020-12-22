This is a quick and dirty proof of concept repo for dynamically loading module using:

1. esm module loading
2. if no esm module supported, fallback to webpack 5 federation.

`app` folder simulates the application, `remote` for external resource serving.

The idea is to build 2 bundle in `app`.
