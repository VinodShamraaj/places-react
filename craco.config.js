const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          "process.env.REACT_APP_GOOGLE_API_KEY": JSON.stringify(
            process.env.REACT_APP_GOOGLE_API_KEY
          ),
        })
      );
      return webpackConfig;
    },
  },
};
