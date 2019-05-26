const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  devServer: {
    quiet: true,
    overlay: true,
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"
    }
  },

  target: "web",

  entry: "./src/client/index.tsx",

  output: {
    path: path.resolve(__dirname, "../../dist/client")
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "./src/client/tsconfig.client.json"
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        include: __dirname,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: "url-loader?limit=10240"
      }
    ]
  },

  stats: "errors-only"
};

module.exports = function(env, argv) {
  let scriptFileName = "";
  let stylesFileName = "";

  if (argv.mode === "development") {
    config.devtool = "cheap-module-eval-source-map";
    scriptFileName = "client.js";
    stylesFileName = "client.css";
  }

  if (argv.mode === "production") {
    config.devtool = "source-map";
    scriptFileName = "[name]-[hash].js";
    stylesFileName = "[name]-[hash].css";
  }

  config.output.filename = scriptFileName;
  config.plugins = [
    new MiniCssExtractPlugin({ filename: stylesFileName }),
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      inject: "body"
    })
  ];

  return config;
};
