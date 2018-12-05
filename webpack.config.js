const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map'
}
