const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    ['content-scripts/facebook']: './src/content-scripts/facebook.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'production'
};
