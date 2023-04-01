/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  entry: { bundle: path.resolve(__dirname, "src/index.tsx") },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
    publicPath: "/",
  },
  performance: {
    hints: false,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    proxy: {
      "/api": "http://localhost:5000",
      changeOrigin: true,
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.bundle\.ts$/,
        use: {
          loader: "bundle-loader",
          options: {
            name: "[name]",
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#1DA57A",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|png|gif|jpg)$/,
        exclude: /fonts/,
        loader: "file-loader",
      },
      {
        test: /\.(ttf|eot|woff|svg|woff2)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      title: "Mern Dashboard",
      favicon: "./public/favicon.ico",
    }),
    new WebpackManifestPlugin(),
    new NodePolyfillPlugin(),
  ],
};
