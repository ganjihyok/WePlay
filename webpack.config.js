const path = require('path');

const ENTRY = path.join(__dirname, 'client', 'app.js');

const OUTPUT = {
  path: path.resolve(__dirname, 'public', 'transpiled'),
  filename: 'bundle.js',
};

const LOADERS = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react', 'airbnb'],
      },
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    },
  ],
};

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: ENTRY,
  output: OUTPUT,
  module: LOADERS,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};