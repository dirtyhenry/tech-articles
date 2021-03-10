const path = require("path");

module.exports = {
  mode: "production",
  entry: "./_javascript/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
};
