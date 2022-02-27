import { DEFAULT_EXTENSIONS } from "@babel/core";
import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      dir: packageJson.main,
      format: "cjs",
      preserveModules: true,
    },
    {
      dir: packageJson.module,
      format: "es",
      preserveModules: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"] }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      babelHelpers: "runtime",
      plugins: ["@babel/plugin-transform-runtime"],
      presets: ["solid", "@babel/preset-typescript"],
    }),
  ],
};
