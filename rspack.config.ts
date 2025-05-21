import { defineConfig } from "@rspack/cli";
import { NormalModule, rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import WebpackObfuscator from "webpack-obfuscator";
import path from "path";
import pkg from "./package.json" with { type: "json" };

const dependencies: Record<string, string> = pkg.dependencies;
const devDependencies: Record<string, string> = pkg.devDependencies;

const allDeps: Record<string, string> = {
  ...dependencies,
  ...devDependencies,
};

function hashPkgName(pkgName: string, mode: "development" | "production") {
  return mode === "development" ? pkgName : Buffer.from(pkgName).toString("hex");
}

// Buat cacheGroups berdasarkan package, dengan nama vendor-<hex>
const createCacheGroups = (mode: "development" | "production") => {
  const groups: Record<string, any> = {};

  for (const key in allDeps) {
    const depName = hashPkgName(key, mode);
    const depValue = (allDeps[key] as string).replaceAll("^", "");
    const depStr = `${depName}@${depValue}`;
    const pkgName = `v.${depName}`;
    groups[pkgName] = {
      test: (module: NormalModule) => {
        return module.resource.endsWith(".js") && module.resource.includes("node_modules") && module.resource.includes(depStr);
      },
      name: pkgName,
      chunks: "all",
      enforce: true,
    };
  }

  return groups;
};

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
      chunkFilename: mode === "development" ? "[name].js" : "[chunkhash].js",
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
        cacheGroups: {
          ...createCacheGroups(mode),
        },
      },
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
