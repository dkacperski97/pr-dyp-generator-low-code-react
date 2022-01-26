const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

const deps = require('./package.json').dependencies;

const commonOptions = require('./webpack.common');

const options = {
  ...commonOptions,
  plugins: [
    ...commonOptions.plugins,
    new ModuleFederationPlugin({
      name: "output",
      filename: "remoteEntry.js",
      exposes: {
        './components': './src/components',
        './Page1': './src/components/Page1',
        './SiteContext': './src/context/SiteContext',
        './useClient': './src/hooks/useClient'
      },
      shared: {
        "react": {
          singleton: true,
          requiredVersion: deps.react,
        }, 
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
        }, 
        "@material-ui/": {
          singleton: true,
        },
        "@apollo/client": {
          singleton: true,
        }
      }
    }),
  ]
}

module.exports = options;