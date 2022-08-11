const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      // 当地址中包含/api时,触发此代理
      '/api': {
        target: 'https://www.fastmock.site/mock/9121da8ff3894af2a6c2e23ae0e1a802/',
        changeOrigin: true, // 跨域
      },
    },
  },

  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
