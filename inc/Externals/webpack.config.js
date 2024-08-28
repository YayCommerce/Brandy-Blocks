const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const glob = require("glob");

/**
 * @see https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
 */

const entry = glob.sync("./Src/Gutenberg/**/*.js").reduce(
  (x, y) =>
    Object.assign(x, {
      [y.replace("./Src/Gutenberg/", "")]: y,
    }),
  {}
);

var indexConfig = Object.assign({}, defaultConfig, {
  name: "index",
  entry,
  output: {
    path: path.resolve(__dirname, "Build/Gutenberg"),
    filename: "[name]",
  },
});

module.exports = [defaultConfig, indexConfig];
