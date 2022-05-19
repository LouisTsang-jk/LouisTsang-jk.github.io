const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除构建文件
const FileListPlugin = require("./plugins/filelist-plugin"); // 打印出所有文件的文件名

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    // 解析 loaders 文件夹里面的 Loader
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
  // optimization: {
  //   usedExports: true, //只导出被使用的模块
  //   minimize : true // 启动压缩
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js/,
        use: ["log-loader"],
      },
    ],
  },
  plugins: [
    new FileListPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      filename: 'index.html',
      template: './src/index.html'
    }),
  ]
};
