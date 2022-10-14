const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/bmw':{
        target:'https://c.musicapp.migu.cn',
        changeOrigin:true,
        pathRewrite:{
          '':''
        }
      }
    }
  }
})
