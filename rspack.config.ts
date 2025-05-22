import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import WebpackObfuscator from "webpack-obfuscator";
import path from "path";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];
const baseOutputPath = path.resolve(import.meta.dirname, "_module");

const clientConfig = (mode: "development" | "production") =>
  defineConfig({
    name: "client",
    mode,
    entry: {
      main: "./client/main.tsx",
    },
    target: "web",
    output: {
      publicPath: "/public/",
      path: path.resolve(baseOutputPath, "public"),
      clean: true,
      filename: "main.js",
      chunkFilename: mode === "development" ? "[name].js" : "[name][chunkhash].js",
    },
    resolve: {
      extensions: ["...", ".ts", ".tsx", ".jsx"],
      alias: {
        $client: path.resolve(import.meta.dirname, "client"),
        $server: path.resolve(import.meta.dirname, "server"),
        $shared: path.resolve(import.meta.dirname, "shared"),
      },
    },
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["postcss-loader"],
          type: "css",
        },
        {
          test: /\.svg$/,
          type: "asset",
        },
        {
          test: /\.(jsx?|tsx?)$/,
          use: [
            {
              loader: "builtin:swc-loader",
              options: {
                jsc: {
                  parser: {
                    syntax: "typescript",
                    tsx: true,
                  },
                  transform: {
                    react: {
                      runtime: "automatic",
                      development: false,
                      refresh: false,
                    },
                  },
                },
                env: { targets },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      mode !== "development"
        ? new WebpackObfuscator({
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false,
          debugProtectionInterval: 0,
          disableConsoleOutput: false,
          identifierNamesGenerator: "mangled-shuffled",
          log: true,
          numbersToExpressions: false,
          renameGlobals: false,
          selfDefending: false,
          simplify: true,
          splitStrings: false,
          stringArray: true,
          stringArrayCallsTransform: false,
          stringArrayCallsTransformThreshold: 0.5,
          stringArrayEncoding: [],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 1,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 2,
          stringArrayWrappersType: "function",
          stringArrayThreshold: 0.75,
          unicodeEscapeSequence: false,
          renamePropertiesMode: "safe",
        })
        : null,
      mode === "development" ? new ReactRefreshRspackPlugin() : null,
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 20 * 1024,   // 20 KiB minimum
        maxSize: 230 * 1024, // 250 KiB
        hidePathInfo: true
      },
      minimizer: [
        new rspack.SwcJsMinimizerRspackPlugin(),
        new rspack.LightningCssMinimizerRspackPlugin({
          minimizerOptions: { targets },
        }),
      ],
    },
    performance: {
      maxAssetSize: 300 * 1024, // 20 KiB
      maxEntrypointSize: 500 * 1024,
      hints: "warning",
    },
    experiments: {
      css: true,
    },
  });

const serverConfig = (mode: "development" | "production") =>
  defineConfig({
    name: "server",
    mode,
    entry: "./server/index.ts",
    target: "node",
    output: {
      path: path.resolve(baseOutputPath),
      filename: "server.js",
      chunkFilename: mode === "development" ? "[name].[chunkhash].js" : "[chunkhash].js",
      clean: {
        keep: /public/,
      },
    },
    stats: {
      warnings: false,
    },
    resolve: {
      extensions: ["...", ".ts", ".tsx", ".jsx"],
      alias: {
        $client: path.resolve(import.meta.dirname, "client"),
        $server: path.resolve(import.meta.dirname, "server"),
        $shared: path.resolve(import.meta.dirname, "shared"),
      },
    },
    devServer: {
      hot: true,
      devMiddleware: {
        writeToDisk: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["postcss-loader"],
          type: "css",
        },
        {
          test: /\.svg$/,
          type: "asset",
        },
        {
          test: /\.(jsx?|tsx?)$/,
          use: [
            {
              loader: "builtin:swc-loader",
              options: {
                jsc: {
                  parser: {
                    syntax: "typescript",
                    tsx: true,
                  },
                  transform: {
                    react: {
                      runtime: "automatic",
                      development: false,
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new rspack.SwcJsMinimizerRspackPlugin(),
        new rspack.LightningCssMinimizerRspackPlugin({
          minimizerOptions: { targets },
        }),
      ],
    },
    experiments: {
      css: true,
    },
    plugins: [
      mode === "development" &&
      new RunScriptWebpackPlugin({
        name: "server.js",
        autoRestart: true,
      }),
    ].filter(Boolean),
  });

export default function (_: any, argv: any) {
  return [clientConfig(argv.mode), serverConfig(argv.mode)];
}
