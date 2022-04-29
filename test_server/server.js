const md5 = require('md5')
const express = require('express')
const app = express()
const volunteerList1 = require('./data/volunteer-list1')
const volunteerList2 = require('./data/volunteer-list2')
const volunteerList3 = require('./data/volunteer-list3')

const adminUsername = 'admin'
const adminPassword = '12345'

app.use((request, response, next) => {
  console.log('有人请求后端服务器了')
  // console.log('请求来自于',request.get('Host'));
  // console.log('请求的地址',request.url);
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', (request, response) => {
  const userName = request.body.username
  const passWord = request.body.password
  let userInfo = {}
  if (userName !== adminUsername) {
    userInfo = {
      code: 10010,
      msg: '用户不存在',
      data: {}
    }
  } else if (passWord !== md5(adminPassword)) {
    userInfo = {
      code: 10020,
      msg: '密码错误',
      data: {}
    }
  } else {
    userInfo = {
      code: 10000,
      msg: '登录成功!',
      data: {
        token: '661fe75115e45a3520ec74121898e2af',
        Info: {
          username: userName,
          password: passWord
        }
      }
    }
  }

  response.send(userInfo)
})

app.post('/changePsd', (request, response) => {
  const Password = request.body.password
  const newPassword = request.body.newPassword
  let userInfo = {}
  if (Password !== adminPassword) {
    userInfo = {
      code: 10010,
      msg: '原密码不正确',
      data: {}
    }
  } else if (newPassword === Password) {
    userInfo = {
      code: 10020,
      msg: '原密码和新密码相同',
      data: {}
    }
  } else {
    userInfo = {
      code: 10000,
      msg: '修改成功',
      data: {}
    }
  } 
  response.send(userInfo)
})

app.post('/volunteerList', (request, response) => {
  let responseData = {}
  if (request.body.page === 1) {
    responseData = {
      code: 10000,
      msg: '获取志愿者列表成功',
      data: {
        list: volunteerList1.list,
        total: 30, // 总的数据条数
        page: '1' // 当前页
      }
    }
  } else if (request.body.page === 2) {
    responseData = {
      code: 10000,
      msg: '获取志愿者列表成功',
      data: {
        list: volunteerList2.list,
        total: 30, // 总的数据条数
        page: '2' // 当前页
      }
    }
  } else if (request.body.page === 3) {
    responseData = {
      code: 10000,
      msg: '获取志愿者列表成功',
      data: {
        list: volunteerList3.list,
        total: 30, // 总的数据条数
        page: '3' // 当前页
      }
    }
  }

  response.send(responseData)
})

app.listen(80, (err) => {
  if (!err) {
    // 请求登录信息地址为: http://localhost:80/login
    // 请求志愿者列表信息地址为: http://localhost:80/volunteerList
    console.log('后端服务器启动成功')
  }
})
