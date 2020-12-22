import path from "path";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

module.exports = {
  input: "./src/index.js",
  output: {
    file: "./dist/app.mjs",
    format: "esm",
  },
  external: ["react"],
  plugins: [
    babel({
      exclude: "node_modules/**",
      configFile: path.resolve(__dirname, "babel.esm.config.js"),
    }),
    peerDepsExternal(),
    postcss({
      extract: false,
      modules: true,
      use: ["sass"],
    }),
  ],
};
