const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const { merge } = require('webpack-merge');
// const common = require('./webpack.config.common.js');
// module.exports = merge(common, {
//   // Enable minification and tree-shaking
//   mode: 'production',
//   optimization: {
//     minimizer: [
//       new OptimizeCssAssetsPlugin({}),
//       new TerserPlugin({
//         extractComments: false,
//       }),
//     ],
//   },
// });

const path = require('path');

module.exports = {
  mode: 'production',
  entry:{
    index : './src/assets/js/index.js'
  },
  output:{
    path: path.resolve(__dirname,'src/static'),
    filename:'[name].[contenthash].js'
  },
  module:{
    rules:[
      {
        test : /\.s[ac]ss$/i,
        use:[

          {
            loader : MiniCssExtractPlugin.loader
          },

          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },

          {
            //Adds auto-prefixers to the css file
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    require('autoprefixer')
                  ],
                ],
              },
            }
          },

          {
            loader:'resolve-url-loader',
            options: {
                sourceMap: true
            }
          },

          {
            //Compiler Sass to CSS
            loader : 'sass-loader',
            options: { 
              sourceMap: true 
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ]
}