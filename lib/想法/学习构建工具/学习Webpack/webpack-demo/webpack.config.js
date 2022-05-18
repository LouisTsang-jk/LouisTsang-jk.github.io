const path = require("path");
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
};
