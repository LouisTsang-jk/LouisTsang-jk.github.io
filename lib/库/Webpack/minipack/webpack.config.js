const path = require("path");

module.exports = {
  entry: "./examples/entry.js",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "./dist"),
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["styles"]
      }
    ]
  },
  plugins: [
    
  ]
};
