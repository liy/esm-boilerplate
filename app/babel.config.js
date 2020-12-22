module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring",
    // Using babel plugin to replace the url to the correct webpack module
    // federation name. It can also done in webpack via NormalModuleReplacementPlugin
    [
      "search-and-replace",
      {
        rules: [
          {
            search: "http://127.0.0.1:3001/esm.js",
            replace: "webpackModule/HelloWorld",
          },
        ],
      },
    ],
  ],
};
