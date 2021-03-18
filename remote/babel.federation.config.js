module.exports = {
  presets: ["@babel/preset-env", "@babel/typescript", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring",
    // Using babel plugin to replace the url to the correct webpack module
    // federation name. It can also done in webpack via NormalModuleReplacementPlugin
    [
      "search-and-replace",
      {
        rules: [
          {
            search: "http://127.0.0.1:3002/nest-module.mjs",
            replace: "nestedWebpackModule/TextBox",
          },
        ],
      },
    ],
  ],
};
