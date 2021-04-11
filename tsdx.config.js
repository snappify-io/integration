const less = require('rollup-plugin-less');

module.exports = {
  rollup(config) {
    config.plugins.push(
      less({
        insert: true,
        output: false,
      })
    );
    return config;
  },
};
