const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./_javascript/syntax-highlighting.js", "./_javascript/footnotes.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
};
