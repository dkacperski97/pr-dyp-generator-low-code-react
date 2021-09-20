const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const options = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.resolve(__dirname, './src/index.tsx'),
    devtool: process.env.NODE_ENV !== 'production' ? 'eval' : undefined,
    devServer: {
      hot: true,
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3001,
      liveReload: false,
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /bootstrap\.tsx$/,
          loader: "bundle-loader",
          options: {
            lazy: true,
          },
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react","@babel/preset-typescript"],
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    output: {
      publicPath: "auto",
      // path: path.resolve(__dirname, './dist'),
      // filename: '[name].js',
      // chunkFilename: '[name].chunk.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        chunks: ["main"]
      }),
    ],
}

module.exports = options;