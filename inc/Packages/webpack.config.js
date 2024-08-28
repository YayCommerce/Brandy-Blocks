const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

/**
 * @see https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
 */

var indexConfig = Object.assign({}, defaultConfig, {
  name: "index",
  entry: {
    index: "./src/external-settings/index.js",
  },
  output: {
    path: path.resolve(__dirname, "build/external-settings"),
    filename: "[name].js",
  },
});

module.exports = [defaultConfig, indexConfig];