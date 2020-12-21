const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // Change port to 3001
    port: 3001,
  },
  output: {
    publicPath: "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "webpackModule",
      library: { type: "var", name: "webpackModule" },
      filename: "webpackModule.js",
      exposes: {
        // expose each component you want
        "./HelloWorld": "./src/index",
      },
      shared: ["react", "react-dom"], // If the consumer application already has these libraries loaded, it won't load them twice
    }),
  ],
};
