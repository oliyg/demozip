const path = require("path");
const FilemanagerWebpackPlugin = require("filemanager-webpack-plugin");

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

const webpack = require("webpack");

const compiler = webpack({
  entry: { main: path.join(src, "index.ts") },
  output: {
    path: path.join(dist, "static"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: src,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new FilemanagerWebpackPlugin({
      events: {
        onEnd: {
          archive: [
            {
              source: path.join(dist, "static"),
              destination: path.join(dist, "zip/app.zip"),
            },
          ],
        },
      },
    }),
  ],
});

compiler.run((err, stats) => {
  console.log(stats.toString());
  compiler.close((closeErr) => {
    console.log("finished");
    process.exit();
  });
});
