const webpack = require('webpack');
const config = require('./webpack.config.node.js');
const isDeveloping = process.env.NODE_ENV !== 'production';

webpack(config).run(function (err, stats) {
  if (err) {
    console.log('Error', err);
  }
  else {
    console.log(stats.toString());
  }
});
