const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      '/MIGUM3.0': {
        target: 'https://app.c.nf.migu.cn',
        changeOrigin: true,
        pathRewrite: {
          '': ''
        }
      },
      '/MIGUM2.0': {
        target: 'https://app.c.nf.migu.cn',
        changeOrigin: true,
        pathRewrite: {
          '': ''
        }
      },
      '/bmw': {
        target: 'https://c.musicapp.migu.cn',
        changeOrigin: true,
        pathRewrite: {
          '': ''
        }
      }
    }
  }
})

