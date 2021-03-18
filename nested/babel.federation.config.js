module.exports = {
  presets: ["@babel/preset-env", "@babel/typescript", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring",
  ],
};
