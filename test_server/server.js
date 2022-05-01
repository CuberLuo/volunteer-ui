const md5 = require('md5')
const express = require('express')
const app = express()
const Mock = require('mockjs')

const adminUsername = 'admin'
const adminPassword = '12345'

// 后端请求拦截器
app.use((request, response, next) => {
  console.log('请求接口:', request.url)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  let userInfo = {}
  if (username !== adminUsername) {
    userInfo = {
      code: 10010,
      msg: '用户不存在',
      data: {}
    }
  } else if (password !== md5(adminPassword)) {
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
        token: '661fe75115e45a3520ec74121898e2af'
      }
    }
  }

  response.send(userInfo)
})

app.post('/volunteerList', (request, response) => {
  const currentPageVolunteerList = []
  const page = request.body.page
  const size = request.body.size
  const total = 88
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size < total ? startIndex + size : total
  for (let i = startIndex; i < endIndex; i++) {
    const obj = Mock.mock({
      id: '@integer(100001,101000)',
      name: '@cname',
      gender: '@boolean',
      birthDate: '@date("yyyy-MM-dd")',
      idCard: '@idcard',
      address: '@ip',
      phone: '@phone'
    })
    currentPageVolunteerList.push(obj)
  }
  const responseData = {
    code: 10000,
    msg: '获取志愿者列表成功',
    data: {
      list: currentPageVolunteerList,
      total: total, // 总的数据条数
      page: page // 当前页
    }
  }

  response.send(responseData)
})

app.delete('/deleteVolunteer/:id', (request, response) => {
  console.log('成功删除志愿者号', request.params.id)
  const responseData = {
    code: 10000,
    msg: '志愿者删除成功',
    data: {}
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
