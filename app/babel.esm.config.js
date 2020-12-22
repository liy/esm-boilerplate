module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-react-jsx",
    [
      "transform-rename-import",
      { original: "^(.+?)\\.scss$", replacement: "$1.css" },
    ],
  ],
};
