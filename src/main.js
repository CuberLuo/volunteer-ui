import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './router/permission'
import './styles/index.css'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus, {
  locale: zhCn
})
// 全局注册el-icon
Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key, ElementPlusIconsVue[key])
})
app.mount('#app')
