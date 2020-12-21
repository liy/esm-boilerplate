/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = (env, { mode = "development", hosting = "true" }) => {
  mode = "development";
  const config = {
    mode,
    entry: {
      app: path.join(__dirname, "src", "index.js"),
    },
    output: {
      // this make sure all the assets to be accessed from root, ie bundle.js be injected by HtmlWebpackPlugin
      // as "/bundle.js". This is necessary in SPA.
      publicPath: "/",
      filename: "[name].js",
      // Where to put the final 'compiled' file
      path: path.join(__dirname, "dist"),
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          // "pre" ensures eslint check the source file before babel-loader transpiling.
          enforce: "pre",
          test: /\.(ts|js)x?$/,
          // aoly is specifically excluded, as npm linked package's path does not match with /node_modules/
          exclude: [/node_modules/],
          loader: "eslint-loader",
        },
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            // inject css into dom
            "development" !== mode
              ? {
                  loader: "style-loader",
                  options: {
                    modules: {
                      namedExport: true,
                    },
                  },
                }
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    modules: {
                      namedExport: true,
                    },
                  },
                },
            // Interpret @import
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                  namedExport: true,
                },
                sourceMap: true,
              },
            },
            // Post process styles
            { loader: "postcss-loader", options: { sourceMap: true } },
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app",
        library: { type: "var", name: "app" },
        remotes: {
          webpackModule: "webpackModule",
        },
        shared: ["react", "react-dom"],
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        inject: false,
        template: "./src/index.html",
        env: {
          target: "dev",
        },
      }),
    ],

    // Export full source map for debugging, maps to original source
    // This could be a little bit slow for bigger project build, but you can change it at anytime
    // to other type of source map to keep the build performance:
    //    http://webpack.github.io/docs/configuration.html#devtool
    devtool: "inline-source-map",

    devServer: {
      host: "0.0.0.0",
      port: hosting === "true" ? 3000 : 3001,
      historyApiFallback: true,
      contentBase: "./dist",
      hot: true,
    },
  };

  if ("development" === mode) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      })
    );
  }

  return config;
};
