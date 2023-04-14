const path = require("path");

// 公共配置
const postConfig = require("./webpackLoader.js");

// 第三方库
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonConfig = {
  mode:"development",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle[contenthash].js",
    path: path.resolve(__dirname, "../build"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          postConfig,
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          postConfig,
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "cssMaster",
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

//这里导出一个对象 在运行webpack的时候 它会调用 并且把 终端的指令转递过来
module.exports = function (env) {
  const isProduction = env.production;
  console.log(env);
  process.env.production = isProduction;
  const config = isProduction ? prodConfig : devConfig;
  return merge(commonConfig, config);
};
