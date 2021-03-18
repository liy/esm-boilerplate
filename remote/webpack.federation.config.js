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
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    externals: {
      // react: "AOReact",
      // "react-dom": "AOReactDOM",
      react: "React",
      "react-dom": "ReactDOM",
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, "babel.federation.config.js"),
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
          "./components": "./src/index",
        },
        remotes: {
          nestedWebpackModule: "nestedWebpackModule",
        },
        shared: ["react"], // If the consumer application already has these libraries loaded, it won't load them twice
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };

  return config;
};
