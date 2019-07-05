// module.exports = {
//   publicPath:
//     process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
// }
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  // 路径别名设置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },
  // 跨域设置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
