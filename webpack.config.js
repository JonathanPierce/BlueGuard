const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    ['content-scripts/facebook']: './src/content-scripts/facebook.js',
    ['content-scripts/facebook-injection']: './src/content-scripts/facebook-injection.js',
    ['content-scripts/kneecap']: './src/content-scripts/kneecap.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'development',
  devtool: 'source-map'
};
