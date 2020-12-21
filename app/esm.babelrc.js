module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring",
    [
      "search-and-replace",
      {
        rules: [
          {
            search: "webpackModule/HelloWorld",
            searchTemplateStrings: true,
            replace: "http://127.0.0.1:3001/esm.js",
          },
        ],
      },
    ],
  ],
};
