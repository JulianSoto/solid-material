import { DEFAULT_EXTENSIONS } from "@babel/core";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import jsx from "acorn-jsx";
import sass from "sass";
import path from "path";

export default {
  external: [/@babel\/runtime/],
  input: "src/index.tsx",
  output: [
    {
      dir: "./dist",
      format: "es",
      preserveModules: true,
    },
  ],
  acornInjectPlugins: [jsx()],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      browser: true,
    }),
    commonjs({ include: /node_modules/ }),
    postcss({
      extract: false,
      modules: false,
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
    typescript({ outDir: "./dist/src", exclude: ["./examples/**/*"] }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      babelHelpers: "runtime",
      plugins: ["@babel/plugin-transform-runtime"],
      presets: ["solid"],
    }),
  ],
};
