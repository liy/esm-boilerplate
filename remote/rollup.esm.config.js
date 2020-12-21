import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

module.exports = {
  input: "./src/index.js",
  output: {
    file: "./dist/esm.js",
    format: "esm",
  },
  external: ["react"],
  plugins: [babel({ exclude: "node_modules/**" }), peerDepsExternal()],
};
