var webpack = require('webpack');
var plugins =[
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]

if(process.env.NODE_ENV === "production"){
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compressor: {
          warnings: false
        }
      })
    )
}

module.exports = {
  context: __dirname + "/clientJs",
  entry: __dirname + "/clientJs"+"/index.js",
  output: {
    filename: "index.js",
    path: __dirname + "/public/js",
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins:plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      { test: /\.css$/, exclude: /node_modules/,loader: "style-loader!css-loader" },
      { test: /\.png$/, exclude: /node_modules/,loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, exclude: /node_modules/,loader: "file-loader" }
    ]
  }
};
