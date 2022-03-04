import { DEFAULT_EXTENSIONS } from "@babel/core";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import sass from "sass";
import path from "path";

export default {
  input: "src/index.tsx",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
    },
    {
      dir: "dist/es",
      format: "es",
      preserveModules: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"] }),
    commonjs({ include: /node_modules/ }),
    postcss({
      extract: false,
      modules: true,
      use: ["sass"],
      loaders: [
        {
          name: "sass",
          test: /\.(sass|scss)$/,
          process: (ctx) => {
            const result = sass.renderSync({
              data: ctx.code,
              includePaths: [path.join(__dirname, "node_modules")],
            });
            return { code: result.css.toString() };
          },
        },
      ],
    }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      babelHelpers: "runtime",
      plugins: ["@babel/plugin-transform-runtime"],
      presets: ["solid", "@babel/preset-typescript"],
    }),
  ],
};
