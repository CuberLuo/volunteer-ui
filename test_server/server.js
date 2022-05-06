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

app.post('/changePsd', (request, response) => {
  const password = request.body.password
  const newPassword = request.body.newPassword
  let userInfo = {}
  if (password !== adminPassword) {
    userInfo = {
      code: 10010,
      msg: '原密码不正确',
      data: {}
    }
  } else if (newPassword === password) {
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
      'gender|1': ['男', '女']
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

app.get('/banVolunteer/:id', (request, response) => {
  console.log('成功封禁志愿者号', request.params.id)
  const responseData = {
    code: 10000,
    msg: '志愿者封禁成功',
    data: {}
  }
  response.send(responseData)
})

app.post('/addVolunteer', (request, response) => {
  console.log(request.body)
  const responseData = {
    code: 10000,
    msg: '志愿者添加成功',
    data: {}
  }
  response.send(responseData)
})

app.get('/getAllVolunteerList', (request, response) => {
  const allVolunteerList = []
  for (let i = 0; i < 88; i++) {
    const obj = Mock.mock({
      id: '@integer(100001,101000)',
      name: '@cname',
      'gender|1': ['男', '女'],
      birthDate: '@date("yyyy-MM-dd")',
      idCard: Mock.mock('@id'),
      address: '@county(true)',
      phone: '@integer(13111111111,19899999999)'
    })
    allVolunteerList.push(obj)
  }
  const responseData = {
    code: 10000,
    msg: '获取所有志愿者列表成功',
    data: {
      list: allVolunteerList
    }
  }

  response.send(responseData)
})

app.get('/getActivitySelectList', (request, response) => {
  const activitySelectList = []
  for (let i = 0; i < 20; i++) {
    const activity = Mock.mock('@cword(5, 10)')
    activitySelectList.push(activity)
  }

  const responseData = {
    code: 10000,
    msg: '获取活动选择列表成功',
    data: {
      list: activitySelectList
    }
  }

  response.send(responseData)
})

app.get('/volunteerInfo/:id', (request, response) => {
  console.log('请求志愿者号' + request.params.id + '的详细信息')
  const obj = Mock.mock({
    id: '@integer(100001,101000)',
    name: '@cname',
    'gender|1': ['男', '女'],
    birthDate: '@date("yyyy-MM-dd")',
    idCard: Mock.mock('@id'),
    address: '@county(true)',
    phone: '@integer(13111111111,19899999999)',
    space: '@cword(5, 10)',
    'state|1': [
      '未工作(未开始工作)',
      '未工作(工作日期内但非工作时间段)',
      '正在工作',
      '已完成工作'
    ]
  })
  const responseData = {
    code: 10000,
    msg: '获取志愿者详细信息成功',
    data: {
      info: obj
    }
  }
  response.send(responseData)
})

app.post('/addActivity', (request, response) => {
  console.log(request.body)
  const responseData = {
    code: 10000,
    msg: '活动添加成功',
    data: {}
  }
  response.send(responseData)
})

app.delete('/deleteActivity/:id', (request, response) => {
  console.log('成功删除活动', request.params.id)
  const responseData = {
    code: 10000,
    msg: '活动删除成功',
    data: {}
  }
  response.send(responseData)
})

app.post('/activityList', (request, response) => {
  const currentPageActivityList = []
  const page = request.body.page
  const size = request.body.size
  const total = 88
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size < total ? startIndex + size : total
  for (let i = startIndex; i < endIndex; i++) {
    const obj = Mock.mock({
      id: '@integer(300001,30100)',
      name: '@ctitle',
      address: '@county(true)'
    })
    currentPageActivityList.push(obj)
  }
  const responseData = {
    code: 10000,
    msg: '获取活动列表成功',
    data: {
      list: currentPageActivityList,
      total: total, // 总的数据条数
      page: page // 当前页
    }
  }

  response.send(responseData)
})

app.get('/activityInfo/:id', (request, response) => {
  const obj = Mock.mock({
    id: '@integer(100001,101000)',
    name: '@ctitle',
    birthDate: '@datetime("yy-MM-dd  HH:mm")',
    address: '@county(true)'
  })
  const responseData = {
    code: 10000,
    msg: '获取志愿者详细信息成功',
    data: {
      info: obj
    }
  }
  response.send(responseData)
})

app.post('/checkVolList', (request, response) => {
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
      'gender|1': ['男', '女'],
      birthDate: '@date("yyyy-MM-dd")',
      idCard: Mock.mock('@id'),
      address: '@county(true)',
      phone: '@integer(13111111111,19899999999)'
    })
    currentPageVolunteerList.push(obj)
  }
  const responseData = {
    code: 10000,
    msg: '获取待审核志愿者列表成功',
    data: {
      list: currentPageVolunteerList,
      total: total, // 总的数据条数
      page: page // 当前页
    }
  }

  response.send(responseData)
})

app.delete('/objectVolunteer/:id', (request, response) => {
  const responseData = {
    code: 10000,
    msg: '成功退回申请',
    data: {}
  }
  response.send(responseData)
})

app.get('/passVolunteer/:id', (request, response) => {
  const responseData = {
    code: 10000,
    msg: '成功通过申请',
    data: {}
  }
  response.send(responseData)
})

app.post('/blackVolList', (request, response) => {
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
      'gender|1': ['男', '女'],
      birthDate: '@date("yyyy-MM-dd")',
      idCard: Mock.mock('@id'),
      address: '@county(true)',
      phone: '@integer(13111111111,19899999999)'
    })
    currentPageVolunteerList.push(obj)
  }
  const responseData = {
    code: 10000,
    msg: '获取志愿者黑名单成功',
    data: {
      list: currentPageVolunteerList,
      total: total, // 总的数据条数
      page: page // 当前页
    }
  }

  response.send(responseData)
})

app.delete('/deleteBlackVol/:id', (request, response) => {
  const responseData = {
    code: 10000,
    msg: '成功删除',
    data: {}
  }
  response.send(responseData)
})

app.get('/removeBlackVol/:id', (request, response) => {
  const responseData = {
    code: 10000,
    msg: '成功移出',
    data: {}
  }
  response.send(responseData)
})

app.post('/changeVolunteerInfo', (request, response) => {
  console.log(request.body)
  const responseData = {
    code: 10000,
    msg: '志愿者信息修改成功',
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
