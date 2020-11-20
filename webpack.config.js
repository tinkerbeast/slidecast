const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    welcome: './src/components/Welcome.jsx',
    app: './src/app.jsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app.html',
      inject: false
    })
  ]
};
