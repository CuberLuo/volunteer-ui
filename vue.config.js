const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.61.20.232:8085', // Wampserver端口号为80
        pathRewrite: { '^/api': '' },
        // 例如将 http://localhost:8080/api/login 变为 http://localhost:80/login
        changeOrigin: true // true表示代理服务器告诉80服务器自己来自http://localhost:80
      }
    }
  }
})
