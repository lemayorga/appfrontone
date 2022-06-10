const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const dotenv = require('dotenv');


const isProdPlugin = [
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-block-scoping',
  ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }],
  ['transform-react-remove-prop-types', { mode: 'wrap', ignoreFilenames: ['node_modules'] }]
];


const isDevPlugin = [
    "react-refresh/babel",  
    "@babel/plugin-transform-runtime",
    ['import', { libraryName: "antd", style: true } ],
];

module.exports = function(_env, argv) {
  
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;
  dotenv.config();
  
  console.log(`*** mode: ${argv.mode} ***`);

  return {
    entry:  path.resolve(__dirname, "./src/index.tsx"),
    target: "web",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename:  "js/[name].[contenthash:8].js",
      publicPath:'/',
      clean: true,
    },
    optimization: {
      splitChunks: { chunks: "all" },
    },
    devtool:(isDevelopment) ? 'source-map' : 'inline-source-map', 
    resolve: {
        extensions: ['.js','.jsx','.ts','.tsx','.css','.less','.scss','.sass','.json'],
        alias: {
          '@app': '/src',
        },
    },
    performance: {
      hints:false ,
      maxAssetSize: 100000,
      maxEntrypointSize: 400000,
    },
    devServer: {
      port: 3000,
      open: true,
      historyApiFallback: true,
      compress: isProduction,
      //host: '192.168.0.5',
     // host: '0.0.0.0',
     // disableHostCheck: true,
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(ts|js)x?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              envName: argv.mode,
              plugins: isProduction ? isProdPlugin : isDevPlugin,
            },
        },    
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          use: [ { loader: 'file-loader' } ],
        },    
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },   
        {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: { lessOptions: { javascriptEnabled: true } },
            },
          ],
        }, 
        // {
        //   loader: "ts-loader",
        //   options: {
        //       configFile: path.resolve(__dirname, './tsconfig.json'), 
        //       compilerOptions: { noEmit: false },   
        //   }
        // }                
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: "./public/favicon.ico",
        template: "./public/index.html",
        manifest: "./public/manifest.json",
        inject: true
      }),
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        overlay: false,
      }),
      // new CopyPlugin({   patterns: [ { from: "src/static/images", to: "static/images/" }, ]  }),
      new Dotenv({
          path: `./environments/.env.${argv.mode}`
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(argv.mode)
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            output: {
              comments: isDevelopment,
              ascii_only: true
            },
            errors: isDevelopment,
            warnings: isDevelopment
          }
        }),
      ],
    }
  };
};