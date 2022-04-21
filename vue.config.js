const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
        // 例如将 http://localhost:8080/api/login 变为 http://localhost:5000/login
        ws: true, // 用于支持websocket
        changeOrigin: true // true表示代理服务器告诉5000服务器自己来自http://localhost:5000
      }
    }
  }
})
