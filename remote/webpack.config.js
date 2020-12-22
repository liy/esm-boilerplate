const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = (env, { mode = "development" }) => {
  const config = {
    entry: "./src/index",
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
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
        {
          test: /\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
                sourceMap: true,
              },
            },
            { loader: "postcss-loader", options: { sourceMap: true } },
            {
              loader: "sass-loader",
            },
          ],
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
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };

  return config;
};
