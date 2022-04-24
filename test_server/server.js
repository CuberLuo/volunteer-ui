const md5 = require('md5')
const express = require('express')
const app = express()

app.use((request, response, next) => {
  console.log('有人请求后端服务器了')
  // console.log('请求来自于',request.get('Host'));
  // console.log('请求的地址',request.url);
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  let userInfo = {}
  if (username !== 'admin') {
    userInfo = {
      code: 10010,
      msg: '用户不存在'
    }
  } else if (password !== md5('12345')) {
    userInfo = {
      code: 10020,
      msg: '密码错误'
    }
  } else {
    userInfo = {
      code: 10000,
      msg: '登录成功!',
      token: '661fe75115e45a3520ec74121898e2af'
    }
  }

  response.send(userInfo)
})

app.listen(80, (err) => {
  if (!err) {
    console.log(
      '后端服务器启动成功了,请求登录信息地址为: http://localhost:80/login'
    )
  }
})
