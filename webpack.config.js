module.exports = {
  entry: "./lib/galactica.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
}
