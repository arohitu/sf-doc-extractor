const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  // Entry points: specific files webpack looks for to start bundling
  entry: {
    popup: './src/popup/popup.js',
    content: './src/content/index.js',
    background: './src/background/service_worker.js',
  },
  // Output: where the bundled files go
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true, // Cleans the dist folder before each build
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
            from: './src/manifest.json', 
            to: 'manifest.json' 
        },
        { 
            from: './src/assets', 
            to: 'assets', 
            noErrorOnMissing: true 
        },
        { 
            from: './src/popup/popup.html', 
            to: 'popup.html' 
        }
      ],
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  // Optimization to keep file sizes manageable
  optimization: {
    minimize: false // Set to true for production release
  }
};