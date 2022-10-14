const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/MIGUM3.0':{
        target:'https://u.musicapp.migu.cn',
        changeOrigin:true,
        pathRewrite:{
          '':''
        }
      },
      '/MIGUM2.0':{
        target:'https://app.c.nf.migu.cn',
        changeOrigin:true,
        pathRewrite:{
          '':''
        }
      },
    }
  }
})
