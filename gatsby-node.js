/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

exports.modifyWebpackConfig = function({config, env}) {
    config.merge({
      node: { fs: 'empty', tls: 'empty', net: 'empty', child_process: 'empty' }
    });
    return config;
  }