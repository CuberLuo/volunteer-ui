const express = require('express')
const app = express()

app.use((request, response, next) => {
  console.log('有人请求服务器3了')
  // console.log('请求来自于',request.get('Host'));
  // console.log('请求的地址',request.url);
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', (request, response) => {
  const userInfo = {
    code: 10000,
    msg: 'success',
    token: '661fe75115e45a3520ec74121898e2af'
  }
  response.send(userInfo)
})

app.listen(80, (err) => {
  if (!err) {
    console.log(
      '服务器3启动成功了,请求登录信息地址为：http://localhost:80/login'
    )
  }
})
