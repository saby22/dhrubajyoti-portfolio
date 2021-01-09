// const Fiber = require('fibers');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const path = require('path');
// module.exports = {
//   // Our "entry" point
//   entry: './src/assets/js/index.js',
//   output: {
//     // The global variable name any `exports` from `index.js` will be available at
//     library: 'SITE',
//     // Where webpack will compile the assets
//     path: path.resolve(__dirname, 'dist/assets'),
//   },
//   module: {
//     rules: [
//       {
//         // Setting up compiling our Sass
//         test: /\.scss$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//           },
//           {
//             loader: 'css-loader',
//             options: {
//               url: false,
//             },
//           },
//           {
//             loader: 'sass-loader',
//             options: {
//               implementation: require('sass'),
//               sassOptions: {
//                 fiber: Fiber,
//                 outputStyle: 'expanded',
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
//   // Any `import`s from `node_modules` will compiled in to a `vendor.js` file.
//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendor',
//           chunks: 'all',
//         },
//       },
//     },
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//     }),
//   ],
// };

const path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  entry:{
    index : './src/assets/js/index.js'
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename:'./assets/[name].js'
  },
  module:{
    rules:[
      {
        test : /\.s[ac]ss$/i,
        use:[

          {
            // Creates `style` nodes from JS strings
            loader : 'style-loader'
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
  }
}



