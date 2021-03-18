import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// https://github.com/rollup/rollup/issues/3188
// https://www.npmjs.com/package/rollup-plugin-external-globals
import externalGlobals from "rollup-plugin-external-globals";

module.exports = {
  input: "./src/TextBox.tsx",
  output: {
    file: "./dist/nest-module.mjs",
    format: "esm",
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    postcss({
      extensions: [".sass", ".scss"],
      extract: false,
      modules: true,
      use: ["sass"],
    }),
    typescript({
      tsconfig: "./tsconfig.json",
    }),

    babel({ exclude: "node_modules/**", babelHelpers: "runtime" }),
    externalGlobals({
      react: "React",
    }),
  ],
};
